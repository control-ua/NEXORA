
const defaultLeads = [
  {id:1,name:'Олександр К.', service:'Монтаж кондиціонера', phone:'+380 67 321 45 67', price:18500, status:'new', source:'Instagram', owner:'Олексій Марченко', note:'Передзвонити до 11:00', created:'Сьогодні, 09:12', history:['Заявка отримана з Instagram']},
  {id:2,name:'Марина П.', service:'Заміри вікон', phone:'+380 50 238 11 09', price:42000, status:'contact', source:'Сайт', owner:'Олексій Марченко', note:'КП вже відправлено', created:'Вчора, 16:40', history:['Заявка з сайту','Комерційну пропозицію відправлено']},
  {id:3,name:'Ігор М.', service:'Сервіс воріт', phone:'+380 93 517 02 20', price:12400, status:'work', source:'Telegram', owner:'Сергій Коваль', note:'Виїзд сьогодні', created:'14 вересня', history:['Заявка створена','Клієнту підтверджено виїзд','Передано в роботу']},
  {id:4,name:'ТОВ Альфа', service:'Монтаж обладнання', phone:'+380 66 190 77 52', price:96000, status:'contact', source:'Рекомендація', owner:'Арсен', note:'Очікуємо рішення директора', created:'13 вересня', history:['Заявка створена','Проведено дзвінок','КП на 96 000 ₴ відправлено']},
  {id:5,name:'Світлана Д.', service:'Клінінг офісу', phone:'+380 98 550 18 44', price:7600, status:'new', source:'Instagram', owner:'Олексій Марченко', note:'', created:'Сьогодні, 10:03', history:['Нова заявка з Instagram']},
  {id:6,name:'Роман В.', service:'Ремонт покрівлі', phone:'+380 63 447 29 60', price:68500, status:'work', source:'Сайт', owner:'Сергій Коваль', note:'Об’єкт відстає на 1 день', created:'12 вересня', history:['Заявка з сайту','Кошторис погоджено','Передано бригаді']}
];
let leads;
try { leads = JSON.parse(localStorage.getItem('nexora_leads')) || defaultLeads; } catch(e){ leads = defaultLeads; }
function saveLeads(){ localStorage.setItem('nexora_leads', JSON.stringify(leads)); }

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

function renderLeads(){
  const board = document.getElementById('lead-board');
  const filter = (document.getElementById('lead-search')?.value || '').toLowerCase();
  const source = document.getElementById('source-filter')?.value || '';
  const cols = [
    {key:'new',title:'Нові'},
    {key:'contact',title:'Контакт / КП'},
    {key:'work',title:'В роботі'}
  ];
  const visible = leads.filter(l => (l.name+l.service+l.phone).toLowerCase().includes(filter) && (!source || l.source===source));
  board.innerHTML='';
  cols.forEach(c=>{
    const col = document.createElement('div');
    col.className='kanban-col';
    const items = visible.filter(l=>l.status===c.key);
    col.innerHTML=`<h3>${c.title} · ${items.length}</h3>`;
    items.forEach(l=>{
      const card=document.createElement('div');
      card.className='lead-card';
      card.innerHTML=`<div class="lead-top"><b>${l.name}</b><span class="money">${Number(l.price).toLocaleString('uk-UA')} ₴</span></div>
        <small>${l.service}</small><small>${l.phone}</small>
        <span class="badge">${l.source}</span>
        <div class="lead-actions">
          <button data-open="${l.id}">Картка</button>
          <button data-next="${l.id}">${l.status==='new'?'В контакт →':l.status==='contact'?'В роботу →':'Завершити'}</button>
        </div>`;
      col.appendChild(card);
    });
    board.appendChild(col);
  });
  const active = leads.filter(l=>l.status!=='done');
  document.getElementById('kpi-active').textContent=active.length;
  document.getElementById('kpi-pipeline').textContent=active.reduce((s,l)=>s+Number(l.price||0),0).toLocaleString('uk-UA')+' ₴';
  document.getElementById('kpi-risk').textContent=leads.filter(l=>l.status==='new').length;
}
renderLeads();
document.getElementById('lead-search').addEventListener('input',renderLeads);
document.getElementById('source-filter').addEventListener('change',renderLeads);

document.getElementById('lead-board').addEventListener('click', e=>{
  const open=e.target.closest('[data-open]');
  const next=e.target.closest('[data-next]');
  if(open) openLead(Number(open.dataset.open));
  if(next) advanceLead(Number(next.dataset.next));
});

function advanceLead(id){
  const l=leads.find(x=>x.id===id); if(!l) return;
  if(l.status==='new'){l.status='contact';l.history.push('Статус змінено: Контакт / КП');}
  else if(l.status==='contact'){l.status='work';l.history.push('Статус змінено: В роботі');}
  else {l.status='done';l.history.push('Роботу завершено');}
  saveLeads(); renderLeads(); toast('Статус заявки оновлено');
}

function openLead(id){
  const l=leads.find(x=>x.id===id); if(!l) return;
  const statusName={new:'Нова',contact:'Контакт / КП',work:'В роботі',done:'Виконана'};
  openModal(`<div class="eyebrow">КАРТКА КЛІЄНТА</div>
    <h3>${l.name}</h3>
    <p>${l.service}<br>${l.phone}</p>
    <p><b>Сума:</b> ${Number(l.price).toLocaleString('uk-UA')} ₴<br><b>Відповідальний:</b> ${l.owner||'—'}<br><b>Джерело:</b> ${l.source}<br><b>Створено:</b> ${l.created||'—'}</p>
    ${l.note?`<p><b>Коментар:</b> ${l.note}</p>`:''}
    <select class="status-select" id="lead-status-edit">
      <option value="new" ${l.status==='new'?'selected':''}>Нова</option>
      <option value="contact" ${l.status==='contact'?'selected':''}>Контакт / КП</option>
      <option value="work" ${l.status==='work'?'selected':''}>В роботі</option>
      <option value="done" ${l.status==='done'?'selected':''}>Виконана</option>
    </select>
    <button class="primary-btn" style="width:100%" onclick="updateLeadStatus(${l.id})">Зберегти статус</button>
    <div class="activity-log">${(l.history||[]).slice().reverse().map(h=>`<div class="activity-row"><b>Подія</b><br>${h}</div>`).join('')}</div>`);
}
window.updateLeadStatus=function(id){
  const l=leads.find(x=>x.id===id); if(!l) return;
  const val=document.getElementById('lead-status-edit').value;
  l.status=val; l.history=l.history||[]; l.history.push('Статус змінено вручну');
  saveLeads(); closeModal(); renderLeads(); toast('Зміни збережено');
};

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
  <p>NEXORA знайшла три ситуації, де швидка дія може підвищити шанс на продаж.</p>
  <ul>
    <li>Передзвонити Олександру — заявка без відповіді 47 хв.</li>
    <li>Повторно написати Марині — КП без реакції 2 дні.</li>
    <li>Уточнити затримку по ремонту покрівлі та попередити клієнта.</li>
  </ul>
`));

document.getElementById('demo-alerts').addEventListener('click',()=>openModal(`<div class="eyebrow">СПОВІЩЕННЯ</div><h3>3 нові події</h3><p>Нова заявка з Instagram · 6 хв тому</p><p>Бригада 1 прибула на об’єкт · 18 хв тому</p><p>КП переглянуто клієнтом · 31 хв тому</p>`));
document.getElementById('add-lead').addEventListener('click',()=>{
  const tpl=document.getElementById('lead-form-template');
  openModal(tpl.innerHTML);
  document.getElementById('lead-form').addEventListener('submit',e=>{
    e.preventDefault();
    const f=new FormData(e.target);
    leads.unshift({
      id:Date.now(), name:f.get('name'), phone:f.get('phone'), service:f.get('service'),
      price:Number(f.get('price')), source:f.get('source'), owner:f.get('owner'),
      note:f.get('note'), status:'new', created:'Щойно', history:['Заявку створено вручну']
    });
    saveLeads(); closeModal(); renderLeads(); toast('Нову заявку створено');
  });
});
document.getElementById('add-person').addEventListener('click',()=>openModal(`<div class="eyebrow">ДЕМО</div><h3>Додавання працівника</h3><p>У повній версії можна буде видати роль, права доступу та прив’язати Telegram.</p>`));

document.querySelectorAll('[data-attention]').forEach(()=>{});
attentionList.addEventListener('click',e=>{
  const btn=e.target.closest('[data-attention]');
  if(!btn) return;
  const a=attention[Number(btn.dataset.attention)];
  openModal(`<div class="eyebrow">NEXORA AI</div><h3>${a.title}</h3><p>${a.sub}</p><p>Рекомендована дія: зв’язатися з клієнтом або відповідальним співробітником зараз, щоб не втратити угоду.</p>`);
});


const loginBtn = document.getElementById('login-btn');
if (loginBtn) {
  loginBtn.addEventListener('click', () => {
    document.getElementById('login-screen').classList.add('hidden');
  });
}

const toastEl=document.createElement('div');
toastEl.className='toast'; document.body.appendChild(toastEl);
function toast(text){toastEl.textContent=text;toastEl.classList.add('show');setTimeout(()=>toastEl.classList.remove('show'),2200);}
