// This is the entry point of your browser app
import { KevoreeModel, modeling } from './org.kevoree';


var kModel = new KevoreeModel(modeling.memory.manager.DataManagerBuilder.buildDefault());
kModel.connect(() => {
	// now you are connected
	var kView = kModel.universe(0).time(0);
	var foo = kView.createFoo();
	var bar = kView.createBar();

	foo.setName('foo0');
	bar.setName('bar0');
	foo.addBar(bar);

	console.log(foo.toJSON());
});
