
const leads = [
  {name:'Олександр К.', service:'Монтаж кондиціонера', phone:'+380 67 321 45 67', price:18500, status:'new', source:'Instagram'},
  {name:'Марина П.', service:'Заміри вікон', phone:'+380 50 238 11 09', price:42000, status:'contact', source:'Сайт'},
  {name:'Ігор М.', service:'Сервіс воріт', phone:'+380 93 517 02 20', price:12400, status:'work', source:'Telegram'},
  {name:'ТОВ Альфа', service:'Монтаж обладнання', phone:'+380 66 190 77 52', price:96000, status:'contact', source:'Рекомендація'},
  {name:'Світлана Д.', service:'Клінінг офісу', phone:'+380 98 550 18 44', price:7600, status:'new', source:'Instagram'},
  {name:'Роман В.', service:'Ремонт покрівлі', phone:'+380 63 447 29 60', price:68500, status:'work', source:'Сайт'}
];

const objects = [
  {title:'Монтаж кондиціонера', client:'Олександр К.', address:'вул. Старокозацька, 44', progress:65, crew:'Бригада 1', value:'18 500 ₴'},
  {title:'Заміри та монтаж вікон', client:'Марина П.', address:'ж/м Перемога, 5', progress:35, crew:'Олексій', value:'42 000 ₴'},
  {title:'Сервіс воріт', client:'Ігор М.', address:'вул. Калинова, 87', progress:80, crew:'Бригада 2', value:'12 400 ₴'},
  {title:'Монтаж обладнання', client:'ТОВ Альфа', address:'просп. Поля, 112', progress:20, crew:'Бригада 3', value:'96 000 ₴'},
  {title:'Ремонт покрівлі', client:'Роман В.', address:'вул. Робоча, 19', progress:52, crew:'Бригада 1', value:'68 500 ₴'},
  {title:'Клінінг офісу', client:'Світлана Д.', address:'вул. Воскресенська, 14', progress:10, crew:'Марія', value:'7 600 ₴'}
];

const team = [
  {name:'Олексій Марченко', role:'Менеджер', jobs:7, load:82, initials:'ОМ'},
  {name:'Сергій Коваль', role:'Майстер', jobs:4, load:74, initials:'СК'},
  {name:'Іван Гринь', role:'Монтажник', jobs:5, load:91, initials:'ІГ'},
  {name:'Марія Бондар', role:'Клінінг', jobs:3, load:63, initials:'МБ'},
  {name:'Андрій Левченко', role:'Монтажник', jobs:4, load:68, initials:'АЛ'},
  {name:'Дмитро Савчук', role:'Сервіс', jobs:6, load:86, initials:'ДС'}
];

const attention = [
  {type:'danger', title:'Клієнту не відповіли 47 хвилин', sub:'Олександр К. · Монтаж кондиціонера · 18 500 ₴'},
  {type:'warning', title:'КП відправлено 2 дні тому', sub:'Марина П. · потенційна угода 42 000 ₴'},
  {type:'danger', title:'Об’єкт відстає від плану', sub:'Ремонт покрівлі · затримка 1 день'}
];

function switchPage(page){
  document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
  document.getElementById(page).classList.add('active');
  document.querySelectorAll('.nav-item').forEach(b=>b.classList.toggle('active', b.dataset.page===page));
  const titles = {dashboard:'Головна',leads:'Заявки',objects:'Об’єкти',team:'Команда',analytics:'Аналітика'};
  document.getElementById('page-title').textContent = titles[page];
  window.scrollTo({top:0,behavior:'smooth'});
}
document.querySelectorAll('.nav-item').forEach(btn=>btn.addEventListener('click',()=>switchPage(btn.dataset.page)));
document.querySelectorAll('[data-page-jump]').forEach(btn=>btn.addEventListener('click',()=>switchPage(btn.dataset.pageJump)));

const attentionList = document.getElementById('attention-list');
attention.forEach((a,i)=>{
  const el = document.createElement('div');
  el.className='attention-item '+(a.type==='warning'?'warning':'');
  el.innerHTML=`<span class="attention-dot"></span><div><b>${a.title}</b><small>${a.sub}</small></div><button class="mini-btn" data-attention="${i}">Відкрити</button>`;
  attentionList.appendChild(el);
});

function renderLeads(filter=''){
  const board = document.getElementById('lead-board');
  const cols = [
    {key:'new',title:'Нові'},
    {key:'contact',title:'Контакт / КП'},
    {key:'work',title:'В роботі'}
  ];
  board.innerHTML='';
  cols.forEach(c=>{
    const col = document.createElement('div');
    col.className='kanban-col';
    const items = leads.filter(l=>l.status===c.key && (l.name+l.service+l.phone).toLowerCase().includes(filter.toLowerCase()));
    col.innerHTML=`<h3>${c.title} · ${items.length}</h3>`;
    items.forEach(l=>{
      const card=document.createElement('div');
      card.className='lead-card';
      card.innerHTML=`<div class="lead-top"><b>${l.name}</b><span class="money">${l.price.toLocaleString('uk-UA')} ₴</span></div><small>${l.service}</small><small>${l.phone}</small><span class="badge">${l.source}</span>`;
      card.addEventListener('click',()=>openModal(`<div class="eyebrow">ЗАЯВКА</div><h3>${l.name}</h3><p>${l.service}<br>${l.phone}</p><p><b>Сума:</b> ${l.price.toLocaleString('uk-UA')} ₴<br><b>Джерело:</b> ${l.source}</p><button class="primary-btn" onclick="closeModal()">Позначити як опрацьовану</button>`));
      col.appendChild(card);
    });
    board.appendChild(col);
  });
}
renderLeads();
document.getElementById('lead-search').addEventListener('input',e=>renderLeads(e.target.value));

const objectGrid=document.getElementById('object-grid');
objects.forEach(o=>{
  const card=document.createElement('div');
  card.className='object-card';
  card.innerHTML=`<div class="eyebrow">АКТИВНИЙ ОБ’ЄКТ</div><h3>${o.title}</h3><div class="meta">${o.client}<br>${o.address}<br>${o.crew}</div><div class="progress"><span style="width:${o.progress}%"></span></div><div class="lead-top"><small>${o.progress}% виконано</small><b>${o.value}</b></div>`;
  card.addEventListener('click',()=>openModal(`<div class="eyebrow">ОБ’ЄКТ</div><h3>${o.title}</h3><p>${o.client}<br>${o.address}</p><p><b>Виконавець:</b> ${o.crew}<br><b>Прогрес:</b> ${o.progress}%<br><b>Вартість:</b> ${o.value}</p><ul><li>Фото «до» — завантажено</li><li>Чек-лист робіт — 6/9</li><li>Фото «після» — очікується</li></ul>`));
  objectGrid.appendChild(card);
});

const teamGrid=document.getElementById('team-grid');
team.forEach(p=>{
  const card=document.createElement('div');
  card.className='team-card';
  card.innerHTML=`<div class="person-row"><div class="person-avatar">${p.initials}</div><div><h3>${p.name}</h3><div class="meta">${p.role}</div></div></div><div class="progress"><span style="width:${p.load}%"></span></div><div class="meta">Завантаження ${p.load}%</div><div class="team-stats"><div><b>${p.jobs}</b><span>активних задач</span></div><div><b>${Math.max(1,Math.round(p.jobs*.7))}</b><span>сьогодні</span></div></div>`;
  teamGrid.appendChild(card);
});

const barsData=[42,58,64,49,78,86,71];
const labels=['Пн','Вт','Ср','Чт','Пт','Сб','Нд'];
const bars=document.getElementById('bars');
barsData.forEach((v,i)=>{
  const w=document.createElement('div'); w.className='bar-wrap';
  w.innerHTML=`<div class="bar" style="height:${v*2.4}px"></div><span>${labels[i]}</span>`;
  bars.appendChild(w);
});

function openModal(html){
  document.getElementById('modal-content').innerHTML=html;
  document.getElementById('modal-backdrop').classList.add('show');
}
function closeModal(){document.getElementById('modal-backdrop').classList.remove('show')}
window.closeModal=closeModal;
document.getElementById('modal-close').addEventListener('click',closeModal);
document.getElementById('modal-backdrop').addEventListener('click',e=>{if(e.target.id==='modal-backdrop') closeModal();});

document.getElementById('open-ai').addEventListener('click',()=>openModal(`
  <div class="eyebrow">AI-РЕКОМЕНДАЦІЇ</div>
  <h3>Сьогодні можна повернути до 74 800 ₴</h3>
  <p>Система знайшла три ситуації, де швидка дія може підвищити шанс на продаж.</p>
  <ul>
    <li>Передзвонити Олександру — заявка без відповіді 47 хв.</li>
    <li>Повторно написати Марині — КП без реакції 2 дні.</li>
    <li>Уточнити затримку по ремонту покрівлі та попередити клієнта.</li>
  </ul>
`));

document.getElementById('demo-alerts').addEventListener('click',()=>openModal(`<div class="eyebrow">СПОВІЩЕННЯ</div><h3>3 нові події</h3><p>Нова заявка з Instagram · 6 хв тому</p><p>Бригада 1 прибула на об’єкт · 18 хв тому</p><p>КП переглянуто клієнтом · 31 хв тому</p>`));
document.getElementById('add-lead').addEventListener('click',()=>openModal(`<div class="eyebrow">ДЕМО</div><h3>Створення заявки</h3><p>У повній версії тут буде форма клієнта, послуга, сума, відповідальний і джерело заявки.</p>`));
document.getElementById('add-person').addEventListener('click',()=>openModal(`<div class="eyebrow">ДЕМО</div><h3>Додавання працівника</h3><p>У повній версії можна буде видати роль, права доступу та прив’язати Telegram.</p>`));

document.querySelectorAll('[data-attention]').forEach(()=>{});
attentionList.addEventListener('click',e=>{
  const btn=e.target.closest('[data-attention]');
  if(!btn) return;
  const a=attention[Number(btn.dataset.attention)];
  openModal(`<div class="eyebrow">AI-КОНТРОЛЬ</div><h3>${a.title}</h3><p>${a.sub}</p><p>Рекомендована дія: зв’язатися з клієнтом або відповідальним співробітником зараз, щоб не втратити угоду.</p>`);
});
