/**
 * AEM Date Picker: `.aem-datepicker` with an `.aem-field__input` and an `.aem-calendar` container. The calendar
 * button or the field opens it; the month and year steppers move, a day fills the field as dd/mm/aaaa and
 * fires `aem-change` with `{ value, date }`. Escape or a click outside closes it. Labels in Spanish.
 */
const MONTHS = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
const WEEKDAYS = ['L', 'M', 'X', 'J', 'V', 'S', 'D'];
const pad = (n) => String(n).padStart(2, '0');
const format = (d) => `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()}`;
const parse = (text) => {
  const m = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/.exec(text.trim());
  return m ? new Date(Number(m[3]), Number(m[2]) - 1, Number(m[1])) : null;
};
const sameDay = (a, b) => a && b && a.toDateString() === b.toDateString();

export function initDatePicker(root = document) {
  for (const host of root.querySelectorAll('.aem-datepicker:not([data-aem-ready])')) {
    const input = host.querySelector('.aem-field__input');
    const calendar = host.querySelector('.aem-calendar');
    if (!input || !calendar) continue;
    host.dataset.aemReady = '';
    const toggle = host.querySelector('.aem-datepicker__toggle');
    const field = input.closest('.aem-field');
    let view = parse(input.value) ?? new Date();
    view = new Date(view.getFullYear(), view.getMonth(), 1);

    const button = (cls, label, iconName, step) => {
      const b = Object.assign(document.createElement('button'), { type: 'button', className: cls });
      b.setAttribute('aria-label', label);
      b.innerHTML = `<i class="ph ph-${iconName}" aria-hidden="true"></i>`;
      b.addEventListener('click', () => {
        view = new Date(view.getFullYear() + step[0], view.getMonth() + step[1], 1);
        render();
      });
      return b;
    };
    const stepper = (text, label, step) => {
      const wrap = Object.assign(document.createElement('div'), { className: 'aem-calendar__stepper' });
      const title = Object.assign(document.createElement('span'), { className: 'aem-calendar__title', textContent: text });
      title.setAttribute('aria-live', 'polite');
      wrap.append(button('aem-calendar__nav', `${label} anterior`, 'caret-left', step.map((s) => -s)), title, button('aem-calendar__nav', `${label} siguiente`, 'caret-right', step));
      return wrap;
    };

    function render() {
      const selected = parse(input.value);
      const today = new Date();
      const head = Object.assign(document.createElement('div'), { className: 'aem-calendar__head' });
      head.append(stepper(MONTHS[view.getMonth()], 'Mes', [0, 1]), stepper(String(view.getFullYear()), 'Año', [1, 0]));
      const grid = Object.assign(document.createElement('div'), { className: 'aem-calendar__grid' });
      grid.setAttribute('role', 'grid');
      for (const day of WEEKDAYS) grid.append(Object.assign(document.createElement('span'), { className: 'aem-calendar__weekday', textContent: day }));
      const start = new Date(view);
      start.setDate(1 - ((view.getDay() + 6) % 7));
      for (let i = 0; i < 42; i++) {
        const date = new Date(start.getFullYear(), start.getMonth(), start.getDate() + i);
        const day = Object.assign(document.createElement('button'), { type: 'button', textContent: String(date.getDate()) });
        day.className = ['aem-calendar__day', date.getMonth() !== view.getMonth() && 'aem-calendar__day--outside', sameDay(date, today) && 'aem-calendar__day--today'].filter(Boolean).join(' ');
        day.setAttribute('aria-label', `${date.getDate()} de ${MONTHS[date.getMonth()]} de ${date.getFullYear()}`);
        day.setAttribute('aria-pressed', String(sameDay(date, selected)));
        day.addEventListener('click', () => {
          input.value = format(date);
          field?.classList.add('has-value');
          host.dispatchEvent(new CustomEvent('aem-change', { bubbles: true, detail: { value: input.value, date } }));
          close();
          input.focus();
        });
        grid.append(day);
      }
      calendar.replaceChildren(head, grid);
    }
    const open = () => {
      if (input.disabled) return;
      const selected = parse(input.value);
      if (selected) view = new Date(selected.getFullYear(), selected.getMonth(), 1);
      render();
      calendar.hidden = false;
      field?.classList.add('is-open');
      toggle?.setAttribute('aria-expanded', 'true');
    };
    function close() {
      calendar.hidden = true;
      field?.classList.remove('is-open');
      toggle?.setAttribute('aria-expanded', 'false');
    }

    toggle?.addEventListener('click', (event) => {
      event.preventDefault();
      calendar.hidden ? open() : close();
    });
    input.addEventListener('click', open);
    host.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && !calendar.hidden) {
        close();
        input.focus();
      }
    });
    document.addEventListener('click', (event) => {
      if (!calendar.hidden && !host.contains(event.target)) close();
    });
  }
}
