const signupForm = document.getElementById("signup-form");
const signupMessage = document.getElementById("signup-message");

if(signupForm){

    signupForm.addEventListener("submit", async (event) => {

        event.preventDefault();

        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        signupMessage.textContent = "Criando conta...";

        const { data, error } = await supabaseClient.auth.signUp({
            email: email,
            password: password,
            options: {
                data: {
                    name: name
                }
            }
        });

        if(error){
            signupMessage.textContent = error.message;
            signupMessage.style.color = "#ff7a00";
            return;
        }

        signupMessage.textContent = "Conta criada! Verifique seu e-mail para confirmar.";
        signupMessage.style.color = "#00ff99";

        signupForm.reset();

    });

}

const loginForm = document.getElementById("login-form");
const loginMessage = document.getElementById("login-message");

if(loginForm){

    loginForm.addEventListener("submit", async (event) => {

        event.preventDefault();

        const email = document.getElementById("login-email").value;
        const password = document.getElementById("login-password").value;

        loginMessage.textContent = "Entrando...";

        const { data, error } = await supabaseClient.auth.signInWithPassword({
            email: email,
            password: password
        });

        if(error){
            loginMessage.textContent = error.message;
            loginMessage.style.color = "#ff7a00";
            return;
        }

        loginMessage.textContent = "Login realizado com sucesso!";
        loginMessage.style.color = "#00ff99";

        setTimeout(() => {
            window.location.href = "perfil.html";
        }, 1000);

    });

}


const profileForm = document.getElementById("profile-form");
const profileMessage = document.getElementById("profile-message");

if(profileForm){

    profileForm.addEventListener("submit", async (event) => {

        event.preventDefault();

        profileMessage.textContent = "Salvando perfil...";

        const { data: userData, error: userError } = await supabaseClient.auth.getUser();

        if(userError || !userData.user){
            profileMessage.textContent = "Você precisa estar logado para salvar o perfil.";
            profileMessage.style.color = "#ff7a00";
            return;
        }

        const user = userData.user;

        const name = document.getElementById("profile-name").value;
        const age = document.getElementById("profile-age").value;
        const city = document.getElementById("profile-city").value;
        const goal = document.getElementById("profile-goal").value;
        const level = document.getElementById("profile-level").value;

        const { error } = await supabaseClient
    .from("profiles")
    .upsert({
        user_id: user.id,
        name: name,
        age: Number(age),
        city: city,
        goal: goal,
        level: level
    }, {
        onConflict: "user_id"
    });

        if(error){
            profileMessage.textContent = error.message;
            profileMessage.style.color = "#ff7a00";
            return;
        }

        profileMessage.textContent = "Perfil salvo com sucesso!";
        profileMessage.style.color = "#00ff99";

        profileForm.reset();

    });

}


const partnersList = document.getElementById("partners-list");

async function loadPartners(){

    if(!partnersList){
        return;
    }

    const { data: userData, error: userError } = await supabaseClient.auth.getUser();

    if(userError || !userData.user){
        partnersList.innerHTML = "<span>Você precisa estar logado para ver parceiros.</span>";
        return;
    }

    const user = userData.user;

    const { data: myProfile, error: profileError } = await supabaseClient
        .from("profiles")
        .select("*")
        .eq("user_id", user.id)
        .single();

    if(profileError || !myProfile){
        partnersList.innerHTML = "<span>Complete seu perfil antes de buscar parceiros.</span>";
        return;
    }

    const { data: profiles, error } = await supabaseClient
        .from("profiles")
        .select("*")
        .neq("user_id", user.id);

    if(error){
        partnersList.innerHTML = `<span>${error.message}</span>`;
        return;
    }

    const compatibleProfiles = profiles.filter((profile) => {
        return (
            profile.city.toLowerCase() === myProfile.city.toLowerCase() ||
            profile.goal === myProfile.goal
        );
    });

    if(compatibleProfiles.length === 0){
        partnersList.innerHTML = "<span>Nenhum parceiro compatível encontrado ainda.</span>";
        return;
    }

    partnersList.innerHTML = "";

    compatibleProfiles.forEach((profile) => {

        let score = 50;

        if(profile.city.toLowerCase() === myProfile.city.toLowerCase()){
            score += 25;
        }

        if(profile.goal === myProfile.goal){
            score += 25;
        }

        partnersList.innerHTML += `
            <div class="partner-item">
                <h3>${profile.name}</h3>
                <p><strong>Cidade:</strong> ${profile.city}</p>
                <p><strong>Objetivo:</strong> ${profile.goal}</p>
                <p><strong>Nível:</strong> ${profile.level}</p>
                <span class="compatibility">${score}% compatível</span>
            </div>
        `;

    });

}

loadPartners();