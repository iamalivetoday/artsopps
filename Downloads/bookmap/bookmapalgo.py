from bs4 import BeautifulSoup
import spacy
import networkx as nx
import matplotlib.pyplot as plt
import matplotlib.colors as mcolors
from colorsys import rgb_to_hls

# "Of the thousands of persons we meet in a lifetime, my child ..."
# Load NLP model
nlp = spacy.load("en_core_web_sm")

# Step 1: Read the HTML file
with open('bridgeofsanluisrey.html', 'r', encoding='utf-8') as file:
  html_content = file.read()

# Step 2: Parse the HTML content
soup = BeautifulSoup(html_content, 'html.parser')
text = soup.get_text()

# Now you can proceed with processing the text
# For example, print the first 500 characters to check
# print(text[:500])


# Function to find verb relationships

characters = ["Brother Juniper", "Marquesa de Montemayor", "The Marquesa de Montemayor", "the Marquesa de Montemayor",
              "Doña María", "Doña Clara", "The Condesa d'Abuirre", "Condesa", "Camila", "Perichole", "the Perichole",
              "Micaela Villegas", "Camila Perichole", "Señora Villegas", "Señora Micaela Villegas", "Uncle Pio",
              "Pepita", "Viceroy",
              "Viceroy Andrés", "The Viceroy", "Viceroy", "Viceroy Andrés", "Abbess", "Madre María del Pilar",
              "The Abbess", "the Abbess", "the Abbess Madre María del Pilar", "Madré María", "Esteban", "the twins",
              "twin", "Manuel", "Archbishop", "Archbishop of Lima", "Captain Alvarado", "Don Jaime",
              "Conde Vicente d’Abuirre", "Captain", "Uncle", "he", "He", "She", "she", "I", "you", "You", "We", "They",
              "Us", "Them", "Our", "Persons", "persons", "people", "child", "we", "they", "us", "them", "our", "him",
              "her", "me", "woman", "person", "son", "daughter", "boy", "girl", "one"]

name_mapping = {
  "Camila": ["Camila", "Perichole", "the Perichole", "Micaela Villegas", "Camila Perichole", "Señora Villegas",
             "Señora Micaela Villegas"],
  "Brother Juniper": ["Brother Juniper"],
  "Doña Clara": ["Doña Clara", "The Condesa d'Abuirre", "Condesa"],
  "Doña María": ["Marquesa de Montemayor", "The Marquesa de Montemayor", "the Marquesa de Montemayor", "Doña María"],
  "Abbess": ["Abbess", "Madre María del Pilar", "The Abbess", "the Abbess", "the Abbess Madre María del Pilar",
             "Madré María"],
  "Esteban": ["Esteban", "the twins", "twin"],
  "Manuel": ["Manuel", "the twins", "twin"],
  "Archbishop": ["Archbishop", "the Archbishop", "The Archbishop of Lima"],
  "Captain Alvarado": ["Captain Alvarado"],
  "Viceroy Andrés": ["The Viceroy", "Viceroy", "Viceroy Andrés"],
  "Uncle Pio": ["Uncle Pio", "Uncle"],
  "Don Jaime": ["Don Jaime"],
  "he": ["he", "He"],
  "him": ["him", "Him"],
  "she": ["she", "She"],
  "her": ["her", "Her"],
  "I": ["I"],
  "me": ["me"],
  "we": ["we", "We"],
  "us": ["us", "Us"],
  "our": ["our", "Our"],
  "they": ["they", "They"],
  "them": ["them", "them"],
  "their": ["their", "Their"],
  "man": ["man"],
  "woman": ["woman"],
  "men": ["men"],
  "women": ["women"],
  "person": ["person", "one"],
  "people": ["people", "persons"],
  "son": ["son", "child"],
  "daughter": ["daughter", "child"],
  "boy": ["boy"],
  "girl": ["girl"],
}


# Function to preprocess relationships
def preprocess_relationships(relationships, name_mapping):
  processed_relationships = []
  # Create a reverse mapping for efficiency
  reverse_mapping = {variation: canonical for canonical, variations in name_mapping.items() for variation in variations}

  for subj, verb, obj in relationships:
    canonical_subj = reverse_mapping.get(subj, subj)
    canonical_obj = reverse_mapping.get(obj, obj)
    processed_relationships.append((canonical_subj, verb, canonical_obj))

  return processed_relationships


def find_verb_relationships(text, characters):
  doc = nlp(text)
  relationships = []
  character_set = set(characters)  # Convert list to set for faster lookup

  for token in doc:
    if token.pos_ == "VERB":
      subjects = [child for child in token.children if child.dep_ == "nsubj"]
      objects = [child for child in token.children if child.dep_ == "dobj"]

      # Check if both subject and object are in the characters list
      if subjects and objects:
        subject = subjects[0].text
        object = objects[0].text

        if subject in character_set and object in character_set:
          relationships.append((subject, token.text, object))

  return relationships


def is_dark_color(color):
    # Convert the color to RGB format and calculate luminance
    r, g, b = mcolors.to_rgb(color)
    luminance = (0.299 * r + 0.587 * g + 0.114 * b)
    return luminance < 0.5

def offset_label_position(pos, x_offset=0.01, y_offset=0.01):
    return {node: (coords[0] + x_offset, coords[1] + y_offset) for node, coords in pos.items()}

def visualize_relationships(relationships, characters):
    G = nx.MultiDiGraph()
    color_map = {}
    number_map = {}

    # Generate unique colors and numbers
    colors = list(mcolors.CSS4_COLORS.values())
    char_list = list(set([subj for subj, verb, obj in relationships] + [obj for subj, verb, obj in relationships]))
    for i, char in enumerate(char_list):
        color_map[char] = colors[i % len(colors)]
        number_map[char] = i + 1  # Assign a unique number starting from 1

    for subj, verb, obj in relationships:
        G.add_edge(subj, obj, label=verb)

    plt.figure(figsize=(19,8))

    pos = nx.spring_layout(G)  # Positions for all nodes

    # Offset positions for edge labels to reduce overlap
    edge_label_pos = offset_label_position(pos)

    # Draw nodes with assigned colors
    node_colors = [color_map[node] for node in G.nodes()]
    nx.draw_networkx_nodes(G, pos, node_color=node_colors)

    # Draw node labels with color based on node's color luminance
    for node in G.nodes():
        text_color = 'white' if is_dark_color(color_map[node]) else 'black'
        plt.text(pos[node][0], pos[node][1], str(number_map[node]), size=12,
                 horizontalalignment='center', verticalalignment='center',
                 color=text_color, weight='bold')

    # Draw edges and edge labels
    for subj, obj, data in G.edges(data=True):
        nx.draw_networkx_edges(G, pos, edgelist=[(subj, obj)], arrows=True)
        edge_label = {(subj, obj): data['label']}
        nx.draw_networkx_edge_labels(G, edge_label_pos, edge_labels=edge_label, font_size=5)

    plt.title("All Subject - Verb - Object Relationships Between Characters In Thornton Wilder's 'The Bridge of San Luis Rey'", fontsize=14)
    plt.subplots_adjust(left=0.05, right=0.95, top=0.95, bottom=0.05)

    # Create a legend mapping numbers to characters
    patch_list = [plt.Line2D([0], [0], marker='o', color='w', label=f'{number_map[char]}: {char}',
                             markersize=10, markerfacecolor=color_map[char]) for char in char_list]
    legend = plt.legend(handles=patch_list, loc='best')
    legend.set_draggable(True)

    plt.show()

relationships = find_verb_relationships(text, characters)
processed_relationships = preprocess_relationships(relationships, name_mapping)
visualize_relationships(processed_relationships, characters)
