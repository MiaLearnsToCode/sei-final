from flask import Blueprint, jsonify, request, g
from webcolors import rgb_to_hex

from models.image import ImageModel, ImageSchema, Note, NoteSchema, Pixel, PixelSchema, ColorSchema
from models.difficulty import Difficulty

from lib.manipulation import image_manipulation
from lib.createpixels import create_pixels
from lib.colorshistogram import create_colors
from lib.secure import secure_route

api = Blueprint('images', __name__)
image_schema = ImageSchema()
note_schema = NoteSchema()
pixel_schema = PixelSchema()
color_schema = ColorSchema()

@api.route('/images', methods=['GET'])
@secure_route
def index():
    images = ImageModel.query.all()
    user_images = []
    for image in images:
        if image.user == g.current_user:
            user_images.append(image)
    return image_schema.jsonify(user_images, many=True), 200

@api.route('/images/<int:image_id>', methods=['GET'])
@secure_route
def show(image_id):
    image = ImageModel.query.get(image_id)
    if not image:
        return jsonify({'message':'Image not found'}), 404
    if image.user != g.current_user:
        return jsonify({'message':'Unauthorized'}), 401
    return image_schema.jsonify(image), 200


@api.route('/images', methods=['POST'])
@secure_route
def create():
    data = request.get_json()
    image, errors = image_schema.load(data)
    if errors:
        return jsonify(errors), 422

    # set difficulty using the id provided
    difficulty = data['difficulty_id']
    image.difficulty = Difficulty.query.get(difficulty)
    image.save()
    return image_schema.jsonify(image), 201


@api.route('/images/<int:image_id>', methods=['DELETE'])
@secure_route
def delete(image_id):
    image = ImageModel.query.get(image_id)
    if not image:
        return jsonify({'message':'Image not found'}), 404
    if image.user != g.current_user:
        return jsonify({'message': 'Unauthorized'}), 401
    image.remove()
    return jsonify({'message':'Image delete'}), 204


@api.route('/images/<int:image_id>/notes', methods=['POST'])
@secure_route
def note_create(image_id):
    image = ImageModel.query.get(image_id)
    if not image:
        return jsonify({'message':'Image not found'}), 404
    if image.user != g.current_user:
        return jsonify({'message': 'Unauthorized'}), 401
    data = request.get_json()
    note, errors = note_schema.load(data)
    if errors:
        return jsonify(errors), 422
    note.image = image
    note.user = g.current_user
    note.save()
    return note_schema.jsonify(note), 202

@api.route('/images/<int:image_id>/notes/<int:note_id>', methods=['DELETE'])
@secure_route
def note_delete(**kwargs):
    note = Note.query.get(kwargs['note_id'])
    if not note:
        return jsonify({'message': 'Not Found'}), 404
    if note.user != g.current_user:
        return jsonify({'message': 'Unauthorized'}), 401
    note.remove()
    return '', 204

@api.route('/images/<int:image_id>/pixels', methods=['POST'])
@secure_route
def generate_pixels(image_id):
    image_created = ImageModel.query.get(image_id)
    if not image_created:
        return jsonify({'message':'Image not found'}), 404
    if image_created.user != g.current_user:
        return jsonify({'message': 'Unauthorized'}), 401
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
@secure_route
def index_pixels(**kwargs):
    image_created = ImageModel.query.get(kwargs['image_id'])
    if not image_created:
        return jsonify({'message':'Image not found'}), 404
    if image_created.user != g.current_user:
        return jsonify({'message': 'Unauthorized'}), 401

    pixel = Pixel.query.get(kwargs['pixel_id'])
    if not pixel:
        return jsonify({'message': 'Pixel not Found'}), 404
    data = request.get_json()
    errors = {}
    pixel, errors = pixel_schema.load(data, instance=pixel, partial=True)
    if errors:
        return jsonify(errors), 422
    pixel.save()
    return pixel_schema.jsonify(pixel), 202


@api.route('/images/<int:image_id>/colors', methods=['POST'])
@secure_route
def generate_colors(image_id):
    image_created = ImageModel.query.get(image_id)
    if not image_created:
        return jsonify({'message':'Image not found'}), 404
    if image_created.user != g.current_user:
        return jsonify({'message': 'Unauthorized'}), 401
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
    colors_list = [str(rgb_to_hex(color_tuple[1])) for color_tuple in colors_list]

    for stitch in stitches_count:
        i = stitches_count.index(stitch)
        color, errors = color_schema.load({'stitches':stitch, 'length': color_length[i], 'color': colors_list[i]})
        if errors:
            return jsonify(errors), 422
        color.image = image_created
        color.save()

    return image_schema.jsonify(image_created), 202
