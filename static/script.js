const correctPassword = "mySecretPassword#2938748901";

async function handleLogin(event) {
    event.preventDefault();
    const userPassword = document.getElementById("password").value;

    if (userPassword === correctPassword) {
        document.getElementById("login-form").style.display = "none";
        document.getElementById("content").style.display = "block";

        const response = await fetch("/get_switch_state");
        const data = await response.json();

        const toggleSwitch = document.getElementById("toggle-switch");
        toggleSwitch.checked = data.state === "on";

        toggleSwitch.addEventListener("change", async () => {
            const state = toggleSwitch.checked ? "on" : "off";
            await fetch("/set_switch_state", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ state }),
            });
        });
    } else {
        alert("Incorrect password. Access denied.");
    }
}
