from flask import Blueprint, jsonify, request
from models.image import ImageModel, ImageSchema, Pixel, PixelSchema, ColorSchema
from models.difficulty import Difficulty
from lib.manipulation import image_manipulation
from lib.createpixels import create_pixels
from lib.colorhistogram import create_colors

api = Blueprint('images', __name__)
image_schema = ImageSchema()
pixel_schema = PixelSchema()
color_schema = ColorSchema()

@api.route('/images', methods=['GET'])
def index():
    images = ImageModel.query.all()
    return image_schema.jsonify(images, many=True), 200


@api.route('/images/<int:image_id>', methods=['GET'])
def show(image_id):
    image = ImageModel.query.get(image_id)
    if not image:
        return jsonify({'message':'Image not found'}), 404
    return image_schema.jsonify(image), 200


@api.route('/images', methods=['POST'])
def create():
    data = request.get_json()
    print(type(data))
    image, errors = image_schema.load(data)
    if errors:
        return jsonify(errors), 422

    # set difficulty using the id provided
    difficulty = data['difficulty_id']
    image.difficulty = Difficulty.query.get(difficulty)

    image.save()

    return image_schema.jsonify(image), 201


@api.route('/images/<int:image_id>', methods=['DELETE'])
def delete(image_id):
    image = ImageModel.query.get(image_id)
    if not image:
        return jsonify({'message':'Image not found'}), 404
    image.remove()
    return jsonify({'message':'Image delete'}), 204


@api.route('/images/<int:image_id>/pixels', methods=['POST'])
def generate_pixels(image_id):
    image_created = ImageModel.query.get(image_id)
    if not image_created:
        return jsonify({'message':'Image not found'}), 404

    # set the url and pixel size
    url = image_created.url
    pixelSize = image_created.difficulty.pixelSize

    # manipulate the image
    image = image_manipulation(url, pixelSize)

    # set the pixels array
    generated_pixels = create_pixels(image)

    for pixel in generated_pixels:
        pixel, errors = pixel_schema.load({'color':pixel, 'ticked': False})
        if errors:
            return jsonify(errors), 422
        pixel.image = image_created
        pixel.save()

    return image_schema.jsonify(image_created), 202


@api.route('/images/<int:image_id>/pixels/<int:pixel_id>', methods=['PUT'])
def index_pixels(**kwargs):
    pixel = Pixel.query.get(kwargs['pixel_id'])
    if not pixel:
        return jsonify({'message': 'Not Found'}), 404
    data = request.get_json()
    errors = {}
    pixel, errors = pixel_schema.load(data, instance=pixel, partial=True)
    if errors:
        return jsonify(errors), 422
    pixel.save()
    return pixel_schema.jsonify(pixel), 202


@api.route('/images/<int:image_id>/colors', methods=['POST'])
def generate_colors(image_id):
    image_created = ImageModel.query.get(image_id)
    if not image_created:
        return jsonify({'message':'Image not found'}), 404

    # set the url and pixel size
    url = image_created.url
    pixelSize = image_created.difficulty.pixelSize

    # manipulate the image
    image = image_manipulation(url, pixelSize)

    colors_list = create_colors(image)

    # stitches count for each color
    stitches_count = [color_tuple[0] for color_tuple in colors_list]

    # length (in mm) of yarn needed for each color
    color_length = [color_tuple[0]*2.5 for color_tuple in colors_list]

    # list of the rgb colors needed for the project
    colors_list = [str(color_tuple[1]) for color_tuple in colors_list]

    for stitches in stitches_count:
        for length in color_length:
            for rgb_value in colors_list:
                color, errors = color_schema.load({'stitches':stitches, 'length': length, 'color':rgb_value})
                if errors:
                    return jsonify(errors), 422
                color.image = image_created
                color.save()

    return image_schema.jsonify(image_created), 202
