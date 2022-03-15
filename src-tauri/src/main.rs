#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]
use postgres::{Client, Error, NoTls};
use serde::Serialize;
use serde_json::json;
use sysinfo::{NetworkExt, System, SystemExt};
//use tauri::Manager;

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
  #[derive(Debug, Serialize)]
  struct Nic {
    name: String,
    rec: u64,
    sent: u64,
  }
  let mut sys = System::new_all();
  sys.refresh_all();
  let mut nics = vec![];
  for (interface_name, data) in sys.networks() {
    nics.push(Nic {
      name: interface_name.to_string(),
      rec: data.received(),
      sent: data.transmitted(),
    });
  }

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
#[tauri::command]
fn get_all_strains() -> String {
  //Connect to DB

  println!("Before function call");
  get_users().unwrap().into()
}

fn get_users() -> Result<String, Error> {
  let mut db = Client::connect(
    "postgresql://acaines:G0ld2Silver@localhost:5432/postgres",
    NoTls,
  )?;

  #[derive(Debug, Serialize)]
  struct User {
    user_id: i32,
    first_name: String,
    last_name: String,
  }
  let mut users = vec![];

  println!("Before the For in loop");
  for row in db.query("SELECT * FROM users", &[])? {
    let id: i32 = row.get(0);
    let first: &str = row.get(1);
    let last: &str = row.get(2);
    users.push(User {
      user_id: id,
      first_name: first.to_string(),
      last_name: last.to_string(),
    });
    println!("User:ID:[{}] {} {} ", id, first, last);
  }
  let users_json = json!({ "users": users });
  println!("Just before return, after the json building");
  Ok(users_json.to_string())
}

fn main() {
  tauri::Builder::default()
    .invoke_handler(tauri::generate_handler![
      test_message,
      echo_message,
      message_from_server,
      get_server_details,
      get_all_strains
    ])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
