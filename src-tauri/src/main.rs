// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod commands;

use tauri::{generate_handler, CustomMenuItem, SystemTray, SystemTrayMenu};

fn main() {
    let quit_item = CustomMenuItem::new("quit".to_string(), "Quit");
    let system_tray_menu = SystemTrayMenu::new().add_item(quit_item);

    tauri::Builder::default()
        .system_tray(SystemTray::new().with_menu(system_tray_menu))
        .invoke_handler(generate_handler![commands::set_badge])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
