use log::info;
use neon::{
    prelude::{Context, FunctionContext, Handle, ModuleContext, Object},
    result::{JsResult, NeonResult},
    types::{JsNumber, JsObject, JsString, JsUndefined},
};

mod init_log;

fn hello(mut cx: FunctionContext) -> JsResult<JsString> {
    let s: Handle<JsString> = cx.argument(0)?;
    let name = s.value(&mut cx);
    Ok(cx.string(format!("Hello {}", name)))
}

fn resize(mut cx: FunctionContext) -> JsResult<JsUndefined> {
    let bounds: Handle<JsObject> = cx.argument(0)?;

    let left: Handle<JsNumber> = bounds.get(&mut cx, "left")?;
    let top: Handle<JsNumber> = bounds.get(&mut cx, "top")?;
    let content_width: Handle<JsNumber> = bounds.get(&mut cx, "contentWidth")?;
    let content_height: Handle<JsNumber> = bounds.get(&mut cx, "contentHeight")?;
    let window_width: Handle<JsNumber> = bounds.get(&mut cx, "windowWidth")?;
    let window_height: Handle<JsNumber> = bounds.get(&mut cx, "windowHeight")?;

    info!(
        "resize(left: {:?}, top: {:?}, content_width: {:?}, content_height: {:?}, window_width: {:?}, window_height: {:?})",
        left.value(&mut cx) as i16,
        top.value(&mut cx) as i16,
        content_width.value(&mut cx) as i16,
        content_height.value(&mut cx) as i16,
        window_width.value(&mut cx) as i16,
        window_height.value(&mut cx) as i16
    );

    Ok(JsUndefined::new(&mut cx))
}

#[neon::main]
fn neon_entry(mut cx: ModuleContext) -> NeonResult<()> {
    init_log::init().or_else(|err| cx.throw_error(err.to_string()))?;
    cx.export_function("hello", hello)?;
    cx.export_function("resize", resize)?;
    Ok(())
}
