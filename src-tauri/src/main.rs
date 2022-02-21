#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]
use serde_json::json;
use serde::Serialize;
use sysinfo::{NetworkExt, NetworksExt, ProcessExt, System, SystemExt};

#[tauri::command]
fn test_message() {
  println!("This call came from the Javascript front end!");
}

#[tauri::command]
fn echo_message(message: String) {
  println!("The front end says: {}", message);
}

#[tauri::command]
fn message_from_server() -> String {
  "This is a secret message from the Backend!!! Tell your friends".into()
}

#[tauri::command]
fn get_server_details() -> String {
  #[derive(Debug)]
  #[derive(Serialize)]
  struct Nic {
    name: String,
    rec: u64,
    sent: u64,
  }
  let mut sys = System::new_all();
  sys.refresh_all();
  let mut nics = vec![];
  let list_nics = for (interface_name, data) in sys.networks() {
    nics.push(Nic {
      name: interface_name.to_string(),
      rec: data.received(),
      sent: data.transmitted(),
    });
  };

  let fake_details = json!({
    "name":"Andrew",
    "os": sys.os_version(),
    "system_name":sys.name(),
    "kernel_ver":sys.kernel_version(),
    "system_hostname":sys.host_name(),
    "cpu_count":sys.processors().len(),
    "mem_total":sys.total_memory(),
    "mem_used":sys.used_memory(),
    "network":nics
  });
  fake_details.to_string().into()
}

fn main() {
  tauri::Builder::default()
    .invoke_handler(tauri::generate_handler![
      test_message,
      echo_message,
      message_from_server,
      get_server_details
    ])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
