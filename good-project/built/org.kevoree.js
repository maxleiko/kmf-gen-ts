"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var modeling = require('kmf');
exports.modeling = modeling;
var KevoreeModel = (function (_super) {
    __extends(KevoreeModel, _super);
    function KevoreeModel(p_manager) {
        _super.call(this, p_manager);
        this._metaModel = new modeling.meta.impl.MetaModel("Kevoree");
        var tempMetaClasses = new Array();
        tempMetaClasses[0] = kevoree.meta.MetaFoo.getInstance();
        tempMetaClasses[1] = kevoree.meta.MetaBar.getInstance();
        var tempEnums = new Array();
        this._metaModel.init(tempMetaClasses, tempEnums);
    }
    KevoreeModel.prototype.internalCreateUniverse = function (key) {
        return new KevoreeUniverse(key, this._manager);
    };
    KevoreeModel.prototype.metaModel = function () {
        return this._metaModel;
    };
    KevoreeModel.prototype.internalCreateObject = function (universe, time, uuid, p_clazz, previousUniverse, previousTime) {
        if (p_clazz == null) {
            return null;
        }
        switch (p_clazz.index()) {
            case 0:
                return new kevoree.impl.FooImpl(universe, time, uuid, p_clazz, this._manager, previousUniverse, previousTime);
            case 1:
                return new kevoree.impl.BarImpl(universe, time, uuid, p_clazz, this._manager, previousUniverse, previousTime);
            default:
                return new modeling.meta.impl.GenericObject(universe, time, uuid, p_clazz, this._manager, previousUniverse, previousTime);
        }
    };
    KevoreeModel.prototype.createFoo = function (universe, time) {
        return this.create(kevoree.meta.MetaFoo.getInstance(), universe, time);
    };
    KevoreeModel.prototype.createBar = function (universe, time) {
        return this.create(kevoree.meta.MetaBar.getInstance(), universe, time);
    };
    return KevoreeModel;
}(modeling.abs.AbstractKModel));
exports.KevoreeModel = KevoreeModel;
var KevoreeUniverse = (function (_super) {
    __extends(KevoreeUniverse, _super);
    function KevoreeUniverse(p_key, p_manager) {
        _super.call(this, p_key, p_manager);
    }
    KevoreeUniverse.prototype.internal_create = function (timePoint) {
        return new impl.KevoreeViewImpl(this._universe, timePoint, this._manager);
    };
    return KevoreeUniverse;
}(modeling.abs.AbstractKUniverse));
exports.KevoreeUniverse = KevoreeUniverse;
var impl;
(function (impl) {
    var KevoreeViewImpl = (function (_super) {
        __extends(KevoreeViewImpl, _super);
        function KevoreeViewImpl(p_universe, _time, p_manager) {
            _super.call(this, p_universe, _time, p_manager);
        }
        KevoreeViewImpl.prototype.createFoo = function () {
            return this.create(kevoree.meta.MetaFoo.getInstance());
        };
        KevoreeViewImpl.prototype.createBar = function () {
            return this.create(kevoree.meta.MetaBar.getInstance());
        };
        return KevoreeViewImpl;
    }(modeling.abs.AbstractKView));
    impl.KevoreeViewImpl = KevoreeViewImpl;
})(impl = exports.impl || (exports.impl = {}));
var kevoree;
(function (kevoree) {
    var impl;
    (function (impl) {
        var BarImpl = (function (_super) {
            __extends(BarImpl, _super);
            function BarImpl(p_universe, p_time, p_uuid, p_metaClass, p_manager, p_previousUniverse, p_previoustTime) {
                _super.call(this, p_universe, p_time, p_uuid, p_metaClass, p_manager, p_previousUniverse, p_previoustTime);
            }
            BarImpl.prototype.getName = function () {
                return this.get(meta.MetaBar.ATT_NAME);
            };
            BarImpl.prototype.setName = function (p_obj) {
                this.set(meta.MetaBar.ATT_NAME, p_obj);
                return this;
            };
            return BarImpl;
        }(modeling.abs.AbstractKObject));
        impl.BarImpl = BarImpl;
        var FooImpl = (function (_super) {
            __extends(FooImpl, _super);
            function FooImpl(p_universe, p_time, p_uuid, p_metaClass, p_manager, p_previousUniverse, p_previoustTime) {
                _super.call(this, p_universe, p_time, p_uuid, p_metaClass, p_manager, p_previousUniverse, p_previoustTime);
            }
            FooImpl.prototype.getName = function () {
                return this.get(meta.MetaFoo.ATT_NAME);
            };
            FooImpl.prototype.setName = function (p_obj) {
                this.set(meta.MetaFoo.ATT_NAME, p_obj);
                return this;
            };
            FooImpl.prototype.addBar = function (p_obj) {
                this.add(meta.MetaFoo.REL_BAR, p_obj);
                return this;
            };
            FooImpl.prototype.removeBar = function (p_obj) {
                this.remove(meta.MetaFoo.REL_BAR, p_obj);
                return this;
            };
            FooImpl.prototype.getBar = function (cb) {
                if (cb == null) {
                    return;
                }
                this.getRelation(meta.MetaFoo.REL_BAR, function (kObjects) {
                    var casted = new Array();
                    for (var i = 0; i < kObjects.length; i++) {
                        casted[i] = kObjects[i];
                    }
                    cb(casted);
                });
            };
            FooImpl.prototype.sizeOfBar = function () {
                return this.size(meta.MetaFoo.REL_BAR);
            };
            return FooImpl;
        }(modeling.abs.AbstractKObject));
        impl.FooImpl = FooImpl;
    })(impl = kevoree.impl || (kevoree.impl = {}));
    var meta;
    (function (meta) {
        var MetaBar = (function (_super) {
            __extends(MetaBar, _super);
            function MetaBar() {
                _super.call(this, "Bar", 1, null, new Int32Array([]));
                var temp_all = new Array();
                temp_all[0] = MetaBar.ATT_NAME;
                temp_all[1] = MetaBar.REL_OP_FOO_BAR;
                this.init(temp_all);
            }
            MetaBar.getInstance = function () {
                if (MetaBar.INSTANCE == null) {
                    MetaBar.INSTANCE = new kevoree.meta.MetaBar();
                }
                return MetaBar.INSTANCE;
            };
            MetaBar.INSTANCE = null;
            MetaBar.ATT_NAME = new modeling.meta.impl.MetaAttribute("name", 0, 0, false, -2, modeling.extrapolation.impl.DiscreteExtrapolation.instance());
            MetaBar.REL_OP_FOO_BAR = new modeling.meta.impl.MetaRelation("op_Foo_bar", 1, false, 0, "bar", 1, -1);
            return MetaBar;
        }(modeling.meta.impl.MetaClass));
        meta.MetaBar = MetaBar;
        var MetaFoo = (function (_super) {
            __extends(MetaFoo, _super);
            function MetaFoo() {
                _super.call(this, "Foo", 0, null, new Int32Array([]));
                var temp_all = new Array();
                temp_all[0] = MetaFoo.ATT_NAME;
                temp_all[1] = MetaFoo.REL_BAR;
                this.init(temp_all);
            }
            MetaFoo.getInstance = function () {
                if (MetaFoo.INSTANCE == null) {
                    MetaFoo.INSTANCE = new kevoree.meta.MetaFoo();
                }
                return MetaFoo.INSTANCE;
            };
            MetaFoo.INSTANCE = null;
            MetaFoo.ATT_NAME = new modeling.meta.impl.MetaAttribute("name", 0, 0, false, -2, modeling.extrapolation.impl.DiscreteExtrapolation.instance());
            MetaFoo.REL_BAR = new modeling.meta.impl.MetaRelation("bar", 1, true, 1, "op_Foo_bar", 0, -1);
            return MetaFoo;
        }(modeling.meta.impl.MetaClass));
        meta.MetaFoo = MetaFoo;
    })(meta = kevoree.meta || (kevoree.meta = {}));
})(kevoree = exports.kevoree || (exports.kevoree = {}));
