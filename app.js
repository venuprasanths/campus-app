const SUPABASE_URL = "https://xawqaqgdgghvvuxtrfgd.supabase.co";
const SUPABASE_KEY = "sb_publishable_2KaXwNW950DAhxig8ltVsA_zu195Fiw";

const supabase = supabaseJs.createClient(SUPABASE_URL, SUPABASE_KEY);

// SIGNUP
async function signup() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const { error } = await supabase.auth.signUp({
    email,
    password
  });

  if (error) alert(error.message);
  else {
    alert("Signup success");
    window.location.href = "index.html";
  }
}

// LOGIN
async function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (error) {
    alert(error.message);
    return;
  }

  if (data.user) {
    window.location.href = "dashboard.html";
  }
}

// CHECK USER
async function checkUser() {
  const { data } = await supabase.auth.getUser();

  if (!data.user) {
    window.location.href = "index.html";
  }
}

// LOGOUT
async function logout() {
  await supabase.auth.signOut();
  window.location.href = "index.html";
}

// LOAD MARKS
async function loadMarks() {
  const { data } = await supabase.auth.getUser();
  if (!data.user) return;

  const { data: marks } = await supabase
    .from("marks")
    .select("*")
    .eq("student_id", data.user.id);

  let html = "";
  marks.forEach(m => {
    html += `<p>${m.subject} : ${m.mark}</p>`;
  });

  document.getElementById("marks").innerHTML = html;
}
