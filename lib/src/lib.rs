use neon::prelude::*;

fn hello(mut cx: FunctionContext) -> JsResult<JsString> {
    let s: Handle<JsString> = cx.argument(0)?;
    let name = s.value(&mut cx);
    Ok(cx.string(format!("Hello {}", name)))
}

#[neon::main]
fn neon_entry(mut cx: ModuleContext) -> NeonResult<()> {
    cx.export_function("hello", hello)?;
    Ok(())
}
