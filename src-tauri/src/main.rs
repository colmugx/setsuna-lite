// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tauri::{CustomMenuItem, SystemTray, SystemTrayMenu};

fn main() {
    let quit_item = CustomMenuItem::new("quit".to_string(), "Quit");
    let system_tray_menu = SystemTrayMenu::new().add_item(quit_item);

    tauri::Builder::default()
        .system_tray(SystemTray::new().with_menu(system_tray_menu))
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
