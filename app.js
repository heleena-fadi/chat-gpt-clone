const APT_KEY = "";
const endpoint = 'https://api.openai.com/v1/chat/completions';

const submitButton = document.querySelector("#submit");
const outPutEl = document.querySelector("#output");
const inputEl = document.querySelector("input");
const historyEl = document.querySelector(".history");
const buttonEl = document.querySelector("button");

function changeInput(value){
    const inputEl = document.querySelector('input')
    inputEl.value = value
}

async function getMessage() {

    const options = {
        method: "POST",
        headers: {
          "Authorization": ` Bearer ${APT_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({  model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: inputEl.value}],
        max_tokens: 1000
      }),
      };

  try {
    const response = await fetch(endpoint, options);
        const data = await response.json();
        console.log (data)
        outPutEl.textContent = data.choices[0].message.content
        if(data.choices[0].message.content &&inputEl.value) {
            const pEl = document.createElement('p')
            pEl.textContent = inputEl.value
            pEl.addEventListener('click', () => changeInput(pEl.textContent))
            historyEl.append(pEl);
        }
  } catch(err) {
    console.log (err)
  }
}

submitButton.addEventListener("click", getMessage);

function clearInput () {
    inputEl.value = '';
}

buttonEl.addEventListener("click", clearInput);
