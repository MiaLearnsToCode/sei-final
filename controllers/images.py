from flask import Blueprint, jsonify, request
from models.image import ImageModel, ImageSchema, PixelSchema
from lib.manipulation import image_manipulation

api = Blueprint('images', __name__)
image_schema = ImageSchema()
pixel_schema = PixelSchema()

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
    image, errors = image_schema.load(data)
    if errors:
        return jsonify(errors), 422
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
def create_pixels(image_id):
    # find the image
    image = ImageModel.query.get(image_id)
    if not image:
        return jsonify({'message':'Image not found'}), 404

    # set the url and pixel size
    url = image.url
    pixelSize = image.difficulty.pixelSize

    image = image_manipulation(url, pixelSize)
    print(image)
    return '', 200
    # # post each pixel
    # sequence_obj = image.getdata()
    # list_sequence_obj = list(sequence_obj)
    #
    # for i in list_sequence_obj:
    #     color = str(i)
    #     data = jsonify({'color': color, 'ticked': False})
    #     pixel, errors = pixel_schema.load(data)
    #     if errors:
    #         return jsonify(errors), 422
    #     pixel.image = image
    #     pixel.save()
    #
    # return image_schema.jsonify(image), 200
