[Home](./index) &gt; [kibana-plugin-server](./kibana-plugin-server.md) &gt; [PluginInitializerContext](./kibana-plugin-server.plugininitializercontext.md) &gt; [config](./kibana-plugin-server.plugininitializercontext.config.md)

## PluginInitializerContext.config property

<b>Signature:</b>

```typescript
config: {
        create: <Schema extends Type<any>, Config>(ConfigClass: ConfigWithSchema<Schema, Config>) => Observable<Config>;
        createIfExists: <Schema extends Type<any>, Config>(ConfigClass: ConfigWithSchema<Schema, Config>) => Observable<Config | undefined>;
    };
```
