use ::log::SetLoggerError;
use log::{Level, LevelFilter};

static PRINT_LOGGER: PrintLogger = PrintLogger;

struct PrintLogger;
impl log::Log for PrintLogger {
    fn enabled(&self, metadata: &log::Metadata) -> bool {
        metadata.level() <= Level::Info
    }

    fn log(&self, record: &log::Record) {
        if self.enabled(record.metadata()) {
            println!("[{}] {}", record.level(), record.args());
        }
    }

    fn flush(&self) {}
}

pub fn init() -> Result<(), SetLoggerError> {
    log::set_logger(&PRINT_LOGGER)?;
    log::set_max_level(LevelFilter::Info);
    Ok(())
}
