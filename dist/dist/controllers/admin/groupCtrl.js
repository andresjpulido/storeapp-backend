'use strict';

//import model from '../models/index' 

//const { user } = model;

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
        }
    }return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
}();

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

var Group = function () {
    function Group() {
        _classCallCheck(this, Group);
    }

    _createClass(Group, null, [{
        key: "create",
        value: function create(req, res) {
            var _req$body = req.body,
                first_name = _req$body.first_name,
                last_name = _req$body.last_name,
                movil = _req$body.movil,
                address = _req$body.address;
            var userId = req.params.userId;

            return res.status(200).send("OK");
        }
    }, {
        key: "modify",
        value: function modify(req, res) {}
    }]);

    return Group;
}();

exports.default = Group;