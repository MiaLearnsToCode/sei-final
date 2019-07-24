import math
from urllib.request import urlopen
from PIL import Image, ImageOps

# pylint: disable=R0914,R0912
def image_manipulation(url, pixelSize):

    # open the image using the url
    image = Image.open(urlopen(url))

    # RESIZE THE IMAGE BASED ON THE GIVEN PIXELS
    image = image.resize((math.floor(image.height/pixelSize), math.floor(image.height/pixelSize)), Image.NEAREST)
    image = ImageOps.fit(image, (pixelSize, pixelSize), centering=(0.5, 0.5))
    image = ImageOps.posterize(image, 3)

    # SIMPLIFY THE IMAGE's COLORS
    colors = [255, 170, 120, 85, 0]
    original_color_count = {}
    color_count = {}

    # Loop through every pixel in the image and modify it so it only uses the allowed values
    for w in range(image.width):
        for h in range(image.height):
            current_color = image.getpixel((w, h))

            if current_color in original_color_count:
                original_color_count[current_color] += 1
            else:
                original_color_count[current_color] = 1

            r, g, b = current_color
            r_set = False
            g_set = False
            b_set = False

            #  Loop through our allowed values and find the closest value to snap to
            # pylint: disable=C0200
            for i in range(len(colors)):
                color_one = colors[i]
                color_two = colors[i + 1]

                if not r_set:
                    if color_one >= r >= color_two:
                        distance_one = color_one - r
                        distance_two = r - color_two
                        r = color_one if distance_one <= distance_two else color_two
                        r_set = True

                if not g_set:
                    if color_one >= g >= color_two:
                        distance_one = color_one - g
                        distance_two = g - color_two
                        g = color_one if distance_one <= distance_two else color_two
                        g_set = True

                if not b_set:
                    if color_one >= b >= color_two:
                        distance_one = color_one - b
                        distance_two = b - color_two
                        b = color_one if distance_one <= distance_two else color_two
                        b_set = True

                if all((r_set, g_set, b_set)):
                    break

            # Set our new pixel back on the image to see the difference
            new_rgb = (r, g, b)
            image.putpixel((w, h), new_rgb)

            if new_rgb in color_count:
                color_count[new_rgb] += 1
            else:
                color_count[new_rgb] = 1

    return image
