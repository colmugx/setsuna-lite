use tauri::command;

#[cfg(target_os = "macos")]
use cocoa::{appkit::NSApp, base::nil, foundation::NSString};
#[cfg(target_os = "macos")]
use objc::{msg_send, sel, sel_impl};

#[command]
pub fn set_badge(count: i32) {
    #[cfg(target_os = "macos")]
    unsafe {
        let label = if count == 0 {
            nil
        } else {
            NSString::alloc(nil).init_str(&format!("{}", count))
        };
        let dock_tile: cocoa::base::id = msg_send![NSApp(), dockTile];
        let _: cocoa::base::id = msg_send![dock_tile, setBadgeLabel: label];
    }
}
