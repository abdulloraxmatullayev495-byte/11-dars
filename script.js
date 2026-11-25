
// let ism = localStorage.getItem("ism");

// if (ism) {
//     document.getElementById("salom").innerText = "Salom, " + ism + "!";
//     document.getElementById("ism").value = ism;
// }

// function saqlash() {
//     let ism = document.getElementById("ism").value.trim();

//     if (ism === "") {
//         alert("Ismingizni yozing!");
//         return;
//     }

//     localStorage.setItem("ism", ism);

//     document.getElementById("salom").innerText = "Salom, " + ism + "!";

//     alert("Ismingiz saqlandi!");
// }




let mahsulotlar = [
    {
        nomi: "Nike Butsi",
        narxi: 100,
        kategoriya: "Butsilar",
        rasm: "https://images.uzum.uz/d95sl8a1146phmqiq2bg/t_product_540_high.jpg"
    },
    {
        nomi: "Adidas Butsi",
        narxi: 120,
        kategoriya: "Butsilar",
        rasm: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400"
    },
    {
        nomi: "Sport Kiyim",
        narxi: 80,
        kategoriya: "Kiyimlar",
        rasm: "https://images.unsplash.com/photo-1523398002811-999ca8dec234?w=400"
    },
    {
        nomi: "Futbolka",
        narxi: 40,
        kategoriya: "Kiyimlar",
        rasm: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400"
    },
    {
        nomi: "Sport Sumka",
        narxi: 60,
        kategoriya: "Aksessuarlar",
        rasm: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400"
    },
    {
        nomi: "Soat",
        narxi: 90,
        kategoriya: "Aksessuarlar",
        rasm: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400"
    }
];

let savatcha = JSON.parse(localStorage.getItem("savatcha")) || [];

function kategoriya(nom, btn) {
    document.querySelectorAll(".categories button")
    .forEach(b => b.classList.remove("active"));

    btn.classList.add("active");

    let natija = nom === "Barchasi"
        ? mahsulotlar
        : mahsulotlar.filter(p => p.kategoriya === nom);

    mahsulotlarniChiqar(natija);
}

function mahsulotlarniChiqar(list) {
    let joy = document.getElementById("products");
    joy.innerHTML = "";

    list.forEach(p => {
        joy.innerHTML += `
            <div class="product-card">
                <img src="${p.rasm}" alt="${p.nomi}">
                <h3>${p.nomi}</h3>
                <p>$${p.narxi}</p>
                <button class="btn-add"
                onclick="savatchagaQoshish('${p.nomi}',${p.narxi})">
                Savatchaga qo'shish
                </button>
            </div>
        `;
    });
}

function savatchagaQoshish(nomi, narxi) {
    let mavjud = savatcha.find(p => p.nomi === nomi);

    if (mavjud) {
        mavjud.soni++;
    } else {
        savatcha.push({
            nomi: nomi,
            narxi: narxi,
            soni: 1
        });
    }

    localStorage.setItem("savatcha", JSON.stringify(savatcha));
    ekranniYangilash();
}

function ekranniYangilash() {
    let jamiSoni = 0;
    let jamiNarx = 0;
    let matn = "";

    savatcha.forEach(item => {
        let summa = item.narxi * item.soni;

        jamiSoni += item.soni;
        jamiNarx += summa;

        matn += item.nomi +
        " | $" + item.narxi +
        " | Soni: " + item.soni +
        " | Jami: $" + summa + "\n\n";
    });

    document.getElementById("counter").innerText = jamiSoni;

    document.getElementById("consoleView").innerText =
        savatcha.length === 0
        ? "Savatcha hozircha bo'sh"
        : matn + "Umumiy soni: " + jamiSoni +
        "\nUmumiy narx: $" + jamiNarx;
}

function clearSavatcha() {
    savatcha = [];
    localStorage.removeItem("savatcha");
    ekranniYangilash();
}

let darkBtn = document.getElementById("darkBtn");

darkBtn.onclick = function() {
    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {
        darkBtn.innerText = "☀ Light Mode";
        localStorage.setItem("darkMode", "on");
    } else {
        darkBtn.innerText = "Dark Mode";
        localStorage.setItem("darkMode", "off");
    }
};

if (localStorage.getItem("darkMode") === "on") {
    document.body.classList.add("dark");
    darkBtn.innerText = "☀ Light Mode";
}

mahsulotlarniChiqar(mahsulotlar);
ekranniYangilash();

