import * as modeling from 'kmf';

export class KevoreeModel extends modeling.abs.AbstractKModel<KevoreeUniverse> {

		private _metaModel: modeling.meta.KMetaModel;
		constructor(p_manager: modeling.memory.manager.internal.KInternalDataManager) {
				super(p_manager);
				this._metaModel = new modeling.meta.impl.MetaModel("Kevoree");
				var tempMetaClasses: modeling.meta.KMetaClass[] = new Array();
				tempMetaClasses[0] = kevoree.meta.MetaFoo.getInstance();
				tempMetaClasses[1] = kevoree.meta.MetaBar.getInstance();
				var tempEnums: modeling.meta.KMetaEnum[] = new Array();
				(<modeling.meta.impl.MetaModel>this._metaModel).init(tempMetaClasses, tempEnums);
		}

		public internalCreateUniverse(key: number): KevoreeUniverse {
				return new KevoreeUniverse(key, this._manager);
		}

		public metaModel(): modeling.meta.KMetaModel {
				return this._metaModel;
		}

		public internalCreateObject(universe: number, time: number, uuid: number, p_clazz: modeling.meta.KMetaClass, previousUniverse: number, previousTime: number): modeling.KObject {
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
		}

		public createFoo(universe: number, time: number): kevoree.Foo {
				return <kevoree.Foo>this.create(kevoree.meta.MetaFoo.getInstance(), universe, time);
		}

		public createBar(universe: number, time: number): kevoree.Bar {
				return <kevoree.Bar>this.create(kevoree.meta.MetaBar.getInstance(), universe, time);
		}

}

export class KevoreeUniverse extends modeling.abs.AbstractKUniverse<KevoreeView, KevoreeUniverse> {

		constructor(p_key: number, p_manager: modeling.memory.manager.internal.KInternalDataManager) {
				super(p_key, p_manager);
		}

		public internal_create(timePoint: number): KevoreeView {
				return new impl.KevoreeViewImpl(this._universe, timePoint, this._manager);
		}

}

export interface KevoreeView extends modeling.KView {

		createFoo(): kevoree.Foo;

		createBar(): kevoree.Bar;

}

export namespace impl {
		export class KevoreeViewImpl extends modeling.abs.AbstractKView implements KevoreeView {

				constructor(p_universe: number, _time: number, p_manager: modeling.memory.manager.internal.KInternalDataManager) {
						super(p_universe, _time, p_manager);
				}

				public createFoo(): kevoree.Foo {
						return <kevoree.Foo>this.create(kevoree.meta.MetaFoo.getInstance());
				}

				public createBar(): kevoree.Bar {
						return <kevoree.Bar>this.create(kevoree.meta.MetaBar.getInstance());
				}

		}

}
export namespace kevoree {
		export interface Bar extends modeling.KObject {

				getName(): string;

				setName(p_obj: string): kevoree.Bar;

		}

		export interface Foo extends modeling.KObject {

				getName(): string;

				setName(p_obj: string): kevoree.Foo;

				addBar(p_obj: kevoree.Bar): kevoree.Foo;

				removeBar(p_obj: kevoree.Bar): kevoree.Foo;

				getBar(cb: modeling.KCallback<Bar[]>): void;

				sizeOfBar(): number;

		}

		export namespace impl {
				export class BarImpl extends modeling.abs.AbstractKObject implements kevoree.Bar {

						constructor(p_universe: number, p_time: number, p_uuid: number, p_metaClass: modeling.meta.KMetaClass, p_manager: modeling.memory.manager.internal.KInternalDataManager, p_previousUniverse: number, p_previoustTime: number) {
								super(p_universe, p_time, p_uuid, p_metaClass, p_manager, p_previousUniverse, p_previoustTime);
						}

						public getName(): string {
								return <string>this.get(meta.MetaBar.ATT_NAME);
						}

						public setName(p_obj: string): kevoree.Bar {
								this.set(meta.MetaBar.ATT_NAME, p_obj);
								return this;
						}

				}

				export class FooImpl extends modeling.abs.AbstractKObject implements kevoree.Foo {

						constructor(p_universe: number, p_time: number, p_uuid: number, p_metaClass: modeling.meta.KMetaClass, p_manager: modeling.memory.manager.internal.KInternalDataManager, p_previousUniverse: number, p_previoustTime: number) {
								super(p_universe, p_time, p_uuid, p_metaClass, p_manager, p_previousUniverse, p_previoustTime);
						}

						public getName(): string {
								return <string>this.get(meta.MetaFoo.ATT_NAME);
						}

						public setName(p_obj: string): kevoree.Foo {
								this.set(meta.MetaFoo.ATT_NAME, p_obj);
								return this;
						}

						public addBar(p_obj: kevoree.Bar): kevoree.Foo {
								this.add(meta.MetaFoo.REL_BAR, p_obj);
								return this;
						}

						public removeBar(p_obj: kevoree.Bar): kevoree.Foo {
								this.remove(meta.MetaFoo.REL_BAR, p_obj);
								return this;
						}

						public getBar(cb: modeling.KCallback<Bar[]>): void {
								if (cb == null) {
										return;
								}
								this.getRelation(meta.MetaFoo.REL_BAR,  (kObjects : modeling.KObject[]) => {
										var casted: kevoree.Bar[] = new Array();
										for (var i: number = 0; i < kObjects.length; i++) {
												casted[i] = <Bar>kObjects[i];
										}
										cb(casted);
								});
						}

						public sizeOfBar(): number {
								return this.size(meta.MetaFoo.REL_BAR);
						}

				}

		}
		export namespace meta {
				export class MetaBar extends modeling.meta.impl.MetaClass {

						private static INSTANCE: kevoree.meta.MetaBar = null;
						public static ATT_NAME: modeling.meta.KMetaAttribute = new modeling.meta.impl.MetaAttribute("name", 0, 0, false, -2, modeling.extrapolation.impl.DiscreteExtrapolation.instance());
						public static REL_OP_FOO_BAR: modeling.meta.KMetaRelation = new modeling.meta.impl.MetaRelation("op_Foo_bar", 1, false, 0, "bar", 1, -1);
						public static getInstance(): kevoree.meta.MetaBar {
								if (MetaBar.INSTANCE == null) {
										MetaBar.INSTANCE = new kevoree.meta.MetaBar();
								}
								return MetaBar.INSTANCE;
						}

						constructor() {
								super("Bar", 1, null, new Int32Array([]));
								var temp_all: modeling.meta.KMeta[] = new Array();
								temp_all[0] = MetaBar.ATT_NAME;
								temp_all[1] = MetaBar.REL_OP_FOO_BAR;
								this.init(temp_all);
						}

				}

				export class MetaFoo extends modeling.meta.impl.MetaClass {

						private static INSTANCE: kevoree.meta.MetaFoo = null;
						public static ATT_NAME: modeling.meta.KMetaAttribute = new modeling.meta.impl.MetaAttribute("name", 0, 0, false, -2, modeling.extrapolation.impl.DiscreteExtrapolation.instance());
						public static REL_BAR: modeling.meta.KMetaRelation = new modeling.meta.impl.MetaRelation("bar", 1, true, 1, "op_Foo_bar", 0, -1);
						public static getInstance(): kevoree.meta.MetaFoo {
								if (MetaFoo.INSTANCE == null) {
										MetaFoo.INSTANCE = new kevoree.meta.MetaFoo();
								}
								return MetaFoo.INSTANCE;
						}

						constructor() {
								super("Foo", 0, null, new Int32Array([]));
								var temp_all: modeling.meta.KMeta[] = new Array();
								temp_all[0] = MetaFoo.ATT_NAME;
								temp_all[1] = MetaFoo.REL_BAR;
								this.init(temp_all);
						}

				}

		}
}
