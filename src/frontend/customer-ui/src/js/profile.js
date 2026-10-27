// Customer account screens. Data is scoped to the signed-in account in this browser.
window.GSpotProfile = function ({ React: R, customer, children, initialTab, onHome }) {
  const h = R.createElement;
  const key = 'gspot-profile:' + (customer.id || customer.email);
  const [tab, setTab] = R.useState(initialTab || 'Profile');
  const [data, setData] = R.useState(() => {
    try { return JSON.parse(localStorage.getItem(key)) || { name: customer.name, email: customer.email, addresses: [], cards: [], banks: [] }; }
    catch { return { name: customer.name, email: customer.email, addresses: [], cards: [], banks: [] }; }
  });
  const [message, setMessage] = R.useState('');
  function save(next) { try { localStorage.setItem(key, JSON.stringify(next)); setData(next); setMessage('Saved successfully.'); } catch { setMessage('Could not save. Try a smaller image or free browser storage.'); } }
  const button = (label, click, extra = {}) => h('button', { type: 'button', onClick: click, ...extra }, label);
  function field(label, name, value = '', type = 'text', required = false) {
    return h('label', { className: 'gp-field' }, h('span', null, label), h('input', { name, type, defaultValue: value, required }));
  }
  function profile() {
    return h('form', { onSubmit: e => { e.preventDefault(); save({ ...data, ...Object.fromEntries(new FormData(e.currentTarget)) }); } },
      h('div', { className: 'gp-profile-grid' }, h('div', null,
        field('Username', 'username', data.username || (customer.email || '').split('@')[0]),
        field('Name', 'name', data.name, 'text', true),
        h('p', { className: 'gp-field' }, h('span', null, 'Login email'), customer.email),
        field('Phone Number', 'phone', data.phone, 'tel'),
        h('label', { className: 'gp-field' }, h('span', null, 'Gender'), h('select', { name: 'gender', defaultValue: data.gender || '' }, ['', 'Male', 'Female', 'Other', 'Prefer not to say'].map(v => h('option', { key: v, value: v }, v || 'Select')))),
        field('Date of birth', 'birthday', data.birthday, 'date'), h('button', { className: 'gp-primary', type: 'submit' }, 'Save')),
        h('div', { className: 'gp-photo' }, avatar(), h('label', null, 'Select Image', h('input', { type: 'file', accept: 'image/png,image/jpeg', onChange: e => {
          const file = e.target.files[0]; if (!file) return;
          if (file.size > 1048576 || !['image/png','image/jpeg'].includes(file.type)) { setMessage('Choose a JPEG or PNG up to 1 MB.'); return; }
          const reader = new FileReader(); reader.onload = () => save({ ...data, photo: reader.result }); reader.readAsDataURL(file);
        } })), h('p', null, 'Maximum 1 MB · JPEG, PNG'))));
  }
  function avatar() { return data.photo ? h('img', { src: data.photo, alt: 'Profile photo', className: 'gp-avatar' }) : h('div', { className: 'gp-avatar' }, (data.name || 'C').slice(0,1).toUpperCase()); }
  const [editing, setEditing] = R.useState(null);
  function addressForm() { return h('form', { className: 'gp-editor', onSubmit: e => {
    e.preventDefault(); const entry = { ...Object.fromEntries(new FormData(e.currentTarget)), id: editing.id || Date.now().toString() };
    save({ ...data, addresses: editing.id ? data.addresses.map(a => a.id === entry.id ? entry : a) : [...data.addresses, entry], defaultAddress: data.defaultAddress || entry.id }); setEditing(null);
  } }, field('Full name','name',editing.name,'text',true),field('Phone','phone',editing.phone,'tel',true),field('Street / Building','street',editing.street,'text',true),field('City / Province','city',editing.city,'text',true),field('Postal code','postal',editing.postal,'text',true),h('button',{type:'submit',className:'gp-primary'},'Save address'),button('Cancel',()=>setEditing(null))); }
  function addresses() { return h('div', null, button('+ Add Address',()=>setEditing({}),{className:'gp-primary'}), editing && addressForm(), ...(data.addresses || []).map(a=>h('article',{className:'gp-row',key:a.id},h('strong',null,a.name),h('p',null,a.phone),h('p',null,a.street),h('p',null,a.city+' '+a.postal),data.defaultAddress===a.id&&h('small',null,'Default address'),h('div',null,button('Edit',()=>setEditing(a)),button('Delete',()=>save({...data,addresses:data.addresses.filter(x=>x.id!==a.id),defaultAddress:data.defaultAddress===a.id?data.addresses.find(x=>x.id!==a.id)?.id:null})),button('Set as default',()=>save({...data,defaultAddress:a.id}))))),!data.addresses.length&&h('p',{className:'gp-empty'},'No addresses yet.')); }
  const [paymentKind, setPaymentKind] = R.useState(null);
  function payments() { return h('div',null,h('p',null,'Demo references only. Enter a label and the last four digits; no real card or bank account is linked.'),paymentKind&&h('form',{className:'gp-editor',onSubmit:e=>{e.preventDefault();const f=new FormData(e.currentTarget);save({...data,[paymentKind]:[...(data[paymentKind]||[]),{id:Date.now().toString(),label:f.get('label'),last4:f.get('last4')}]});setPaymentKind(null);}},field('Display label','label','','text',true),h('label',{className:'gp-field'},'Last four digits',h('input',{name:'last4',pattern:'[0-9]{4}',maxLength:4,required:true,inputMode:'numeric'})),h('button',{type:'submit',className:'gp-primary'},'Save reference'),button('Cancel',()=>setPaymentKind(null))),...['cards','banks'].map(kind=>h('section',{key:kind},h('div',{className:'gp-heading'},h('h3',null,kind==='cards'?'Credit / Debit Card':'My Bank Accounts'),button('+ Add '+(kind==='cards'?'Card':'Bank Account'),()=>setPaymentKind(kind),{className:'gp-primary'})),!(data[kind]||[]).length?h('p',{className:'gp-empty'},'You do not have '+kind+' yet.'):(data[kind]||[]).map(v=>h('div',{className:'gp-row',key:v.id},v.label+' •••• '+v.last4,button('Remove',()=>save({...data,[kind]:data[kind].filter(x=>x.id!==v.id)}))))))); }
  return h('div',{className:'gp-shell'},h('aside',null,h('div',{className:'gp-user'},avatar(),h('strong',null,data.name)),button('← Back to shop', onHome),h('h3',null,'My Account'),...['Profile','Banks & Cards','Addresses','My Purchase'].map(name=>button(name,()=>{setTab(name);setMessage('');setEditing(null);setPaymentKind(null);},{key:name,className:tab===name?'gp-active':''}))),h('main',null,h('header',null,h('h2',null,tab==='Profile'?'My Profile':tab==='Addresses'?'My Addresses':tab),h('p',null,tab==='Profile'?'Manage your G Spot account':'')),message&&h('p',{role:'status'},message),tab==='Profile'?profile():tab==='Addresses'?addresses():tab==='Banks & Cards'?payments():children));
};

// Signed-in storefront account menu, with the locally saved profile photo.
window.GSpotAccountMenu = function ({ React: R, customer, onAccount, onLogout }) {
  const h = R.createElement;
  const [open, setOpen] = R.useState(false);
  let profile = {};
  try { profile = JSON.parse(localStorage.getItem('gspot-profile:' + (customer.id || customer.email))) || {}; } catch {}
  const label = profile.username || (customer.email || '').split('@')[0] || customer.name;
  const box = R.useRef(null);
  R.useEffect(() => {
    function close(e) { if (!box.current?.contains(e.target)) setOpen(false); }
    function escape(e) { if (e.key === 'Escape') setOpen(false); }
    document.addEventListener('pointerdown', close);
    document.addEventListener('keydown', escape);
    return () => { document.removeEventListener('pointerdown', close); document.removeEventListener('keydown', escape); };
  }, []);
  return h('div', { className: 'gs-account-menu', ref: box },
    h('button', { type: 'button', className: 'gs-account-trigger', onClick: () => setOpen(!open), 'aria-expanded': open, 'aria-label': 'Customer account: ' + label },
      profile.photo ? h('img', { src: profile.photo, alt: '', className: 'gs-account-avatar' }) : h('span', { className: 'gs-account-avatar' }, (profile.name || customer.name || 'C').slice(0, 1).toUpperCase()),
      h('span', null, label), h('span', { 'aria-hidden': true }, '⌄')),
    open && h('div', { className: 'gs-account-dropdown' },
      ...['My Account', 'My Purchase'].map((name, idx) => h('button', { type: 'button', key: name, onClick: () => { setOpen(false); onAccount(idx ? 'My Purchase' : 'Profile'); } }, name)),
      h('button', { type: 'button', onClick: onLogout }, 'Log Out')));
};
