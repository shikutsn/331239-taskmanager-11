import {DAYS, MONTH_NAMES} from "../const.js";
import {formatTime} from "../utils.js";

const createRepeatingDaysMarkup = (days, repeatingDays) => {
  return days
    .map((day, index) => {
      const isChecked = repeatingDays[day];
      return (
        `<input
          class="visually-hidden card__repeat-day-input"
          type="checkbox"
          id="repeat-${day}-${index}"
          name="repeat"
          value="${day}"
          ${isChecked ? `checked` : ``}
        />
        <label class="card__repeat-day" for="repeat-${day}-${index}"
          >${day}</label
        >`
      );
    })
    .join(`\n`);
};

const createColorsMarkup = () => {
  return (
    `<input
      type="radio"
      id="color-black-4"
      class="card__color-input card__color-input--black visually-hidden"
      name="color"
      value="black"
    />
    <label
      for="color-black-4"
      class="card__color card__color--black"
      >black</label
    >
    <input
      type="radio"
      id="color-yellow-4"
      class="card__color-input card__color-input--yellow visually-hidden"
      name="color"
      value="yellow"
      checked
    />
    <label
      for="color-yellow-4"
      class="card__color card__color--yellow"
      >yellow</label
    >
    <input
      type="radio"
      id="color-blue-4"
      class="card__color-input card__color-input--blue visually-hidden"
      name="color"
      value="blue"
    />
    <label
      for="color-blue-4"
      class="card__color card__color--blue"
      >blue</label
    >
    <input
      type="radio"
      id="color-green-4"
      class="card__color-input card__color-input--green visually-hidden"
      name="color"
      value="green"
    />
    <label
      for="color-green-4"
      class="card__color card__color--green"
      >green</label
    >
    <input
      type="radio"
      id="color-pink-4"
      class="card__color-input card__color-input--pink visually-hidden"
      name="color"
      value="pink"
    />
    <label
      for="color-pink-4"
      class="card__color card__color--pink"
      >pink</label
    >`
  );
};

export const createTaskEditTemplate = (task) => {
  const {description, dueDate, color, repeatingDays} = task;

  const isExpired = dueDate instanceof Date && dueDate < Date.now();
  const isDateShowing = !!dueDate;

  const date = isDateShowing ? `${dueDate.getDate()} ${MONTH_NAMES[dueDate.getMonth()]}` : ``;
  const time = isDateShowing ? formatTime(dueDate) : ``;

  const isRepeatingTask = Object.values(repeatingDays).some(Boolean);
  const repeatClass = isRepeatingTask ? `card--repeat` : ``;
  const deadlineClass = isExpired ? `card--deadline` : ``;

  const colorsMarkup = createColorsMarkup();
  const repeatingDaysMarkup = createRepeatingDaysMarkup(DAYS, repeatingDays);

  return (
    `<article class="card card--edit card--${color} ${repeatClass} ${deadlineClass}">
      <form class="card__form" method="get">
        <div class="card__inner">
          <div class="card__color-bar">
            <svg class="card__color-bar-wave" width="100%" height="10">
              <use xlink:href="#wave"></use>
            </svg>
          </div>
          <div class="card__textarea-wrap">
            <label>
              <textarea
                class="card__text"
                placeholder="Start typing your text here..."
                name="text"
              >${description}</textarea>
            </label>
          </div>
          <div class="card__settings">
            <div class="card__details">
              <div class="card__dates">
                <button class="card__date-deadline-toggle" type="button">
                  date: <span class="card__date-status">${isDateShowing ? `yes` : `no`}</span>
                </button>
                ${
    isDateShowing ?
      `<fieldset class="card__date-deadline">
                      <label class="card__input-deadline-wrap">
                        <input
                          class="card__date"
                          type="text"
                          placeholder=""
                          name="date"
                          value="${date} ${time}"
                        />
                      </label>
                    </fieldset>`
      : ``
    }
                <button class="card__repeat-toggle" type="button">
                  repeat:<span class="card__repeat-status">${isRepeatingTask ? `yes` : `no`}</span>
                </button>
                ${
    isRepeatingTask ?
      `<fieldset class="card__repeat-days">
                      <div class="card__repeat-days-inner">
                        ${repeatingDaysMarkup}
                      </div>
                    </fieldset>`
      : ``
    }
              </div>
            </div>
            <div class="card__colors-inner">
              <h3 class="card__colors-title">Color</h3>
              <div class="card__colors-wrap">
                ${colorsMarkup}
              </div>
            </div>
          </div>
          <div class="card__status-btns">
            <button class="card__save" type="submit">save</button>
            <button class="card__delete" type="button">delete</button>
          </div>
        </div>
      </form>
    </article>`
  );
};
