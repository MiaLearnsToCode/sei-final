# pylint: disable=W0611
from PIL import Image

def create_pixels(image):
    sequence_obj = image.getdata()
    list_sequence_obj = list(sequence_obj)
    generated_pixels = []

    for i in list_sequence_obj:
        color = str(i)
        generated_pixels.append(color)

    return generated_pixels
