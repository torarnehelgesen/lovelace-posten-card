import { css, CSSResult } from 'lit-element';

export const getStyles = (): CSSResult => {
  return css`
    .logo {
      margin-right: 20px;
      height: 40px;
    }
    .icon {
      flex: 1;
      text-align: right;
    }
    .deliveryDays {
      background-color: var(--table-row-background-color);
      color: var(--primary-text-color);
    }
    .deliveryDays div:nth-child(even) {
      background-color: var(--table-row-alternative-background-color);
      color: var(--primary-text-color);
    }
    .deliveryDay {
      display: flex;
      padding: 8px;
    }
    .deliveryDay .daysUntil {
      flex: 1;
      text-align: right;
      font-size: 0.8em;
      color: gray;
    }
    .card-header {
      display: flex;
      align-items: center;
    }
    ha-card img {
      vertical-align: middle;
    }
  `;
};
