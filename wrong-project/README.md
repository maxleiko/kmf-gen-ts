## This is an example of the current output of KMF while generating for "js"

KMF only generates one file named after your `pom.xml` **artifactId**.  

I think that KMF should use the `<file_name>.mm` name to name the generated \*.ts file.  
But mainly, KMF should **not** generate a 21790 line TypeScript file for a 7 lines MetaModel file.
Which means that it should not concatenate `java.ts`, `kmf.ts` and `the_model.ts` in one file.

```txt
class org.kevoree.Foo {
    att name: String
    rel bar: org.kevoree.Bar
}

class org.kevoree.Bar {
    att name: String
}
```

By default, KMF should generate the strict minimum (which is the same as what's get generated for Java), which is the set of interfaces/classes starting at line 21570 (see `model.ts`)

Also it should use the new TypeScript concept of **namespace** instead of **module** as it should produce **CommonJS** files (for better modularity).

Now see the [good project](/good-project/README.md)
