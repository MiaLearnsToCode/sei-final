# pylint: disable=W0611
from PIL import Image

def create_colors(image):
    # COLORS HISTOGRAM : Array of the colors (sorted by most persent to least present)
    colors_list = image.getcolors()
    colors_list = sorted(colors_list, key=lambda tup: (tup[0], tup[1]))
    colors_list = colors_list[::-1]
    return colors_list
