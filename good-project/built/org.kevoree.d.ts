import * as modeling from 'kmf';
export import modeling = modeling;
export declare class KevoreeModel extends modeling.abs.AbstractKModel<KevoreeUniverse> {
    private _metaModel;
    constructor(p_manager: modeling.memory.manager.internal.KInternalDataManager);
    internalCreateUniverse(key: number): KevoreeUniverse;
    metaModel(): modeling.meta.KMetaModel;
    internalCreateObject(universe: number, time: number, uuid: number, p_clazz: modeling.meta.KMetaClass, previousUniverse: number, previousTime: number): modeling.KObject;
    createFoo(universe: number, time: number): kevoree.Foo;
    createBar(universe: number, time: number): kevoree.Bar;
}
export declare class KevoreeUniverse extends modeling.abs.AbstractKUniverse<KevoreeView, KevoreeUniverse> {
    constructor(p_key: number, p_manager: modeling.memory.manager.internal.KInternalDataManager);
    internal_create(timePoint: number): KevoreeView;
}
export interface KevoreeView extends modeling.KView {
    createFoo(): kevoree.Foo;
    createBar(): kevoree.Bar;
}
export declare namespace impl {
    class KevoreeViewImpl extends modeling.abs.AbstractKView implements KevoreeView {
        constructor(p_universe: number, _time: number, p_manager: modeling.memory.manager.internal.KInternalDataManager);
        createFoo(): kevoree.Foo;
        createBar(): kevoree.Bar;
    }
}
export declare namespace kevoree {
    interface Bar extends modeling.KObject {
        getName(): string;
        setName(p_obj: string): kevoree.Bar;
    }
    interface Foo extends modeling.KObject {
        getName(): string;
        setName(p_obj: string): kevoree.Foo;
        addBar(p_obj: kevoree.Bar): kevoree.Foo;
        removeBar(p_obj: kevoree.Bar): kevoree.Foo;
        getBar(cb: modeling.KCallback<Bar[]>): void;
        sizeOfBar(): number;
    }
    namespace impl {
        class BarImpl extends modeling.abs.AbstractKObject implements kevoree.Bar {
            constructor(p_universe: number, p_time: number, p_uuid: number, p_metaClass: modeling.meta.KMetaClass, p_manager: modeling.memory.manager.internal.KInternalDataManager, p_previousUniverse: number, p_previoustTime: number);
            getName(): string;
            setName(p_obj: string): kevoree.Bar;
        }
        class FooImpl extends modeling.abs.AbstractKObject implements kevoree.Foo {
            constructor(p_universe: number, p_time: number, p_uuid: number, p_metaClass: modeling.meta.KMetaClass, p_manager: modeling.memory.manager.internal.KInternalDataManager, p_previousUniverse: number, p_previoustTime: number);
            getName(): string;
            setName(p_obj: string): kevoree.Foo;
            addBar(p_obj: kevoree.Bar): kevoree.Foo;
            removeBar(p_obj: kevoree.Bar): kevoree.Foo;
            getBar(cb: modeling.KCallback<Bar[]>): void;
            sizeOfBar(): number;
        }
    }
    namespace meta {
        class MetaBar extends modeling.meta.impl.MetaClass {
            private static INSTANCE;
            static ATT_NAME: modeling.meta.KMetaAttribute;
            static REL_OP_FOO_BAR: modeling.meta.KMetaRelation;
            static getInstance(): kevoree.meta.MetaBar;
            constructor();
        }
        class MetaFoo extends modeling.meta.impl.MetaClass {
            private static INSTANCE;
            static ATT_NAME: modeling.meta.KMetaAttribute;
            static REL_BAR: modeling.meta.KMetaRelation;
            static getInstance(): kevoree.meta.MetaFoo;
            constructor();
        }
    }
}
