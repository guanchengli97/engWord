/* Fixed, row-major theme layout shared by DOM cards, canvas and hit testing. */
(function (root) {
  class GroupedWordLayout {
    constructor(words, themes, saved) {
      this.version = 3;
      this.columns = 20;
      this.width = 280;
      this.height = 210;
      this.gap = 20;
      this.padding = 24;
      this.headerHeight = 76;
      this.groupGap = 2;
      this.reserveRows = 2;
      this.themeIds = new Set(themes.map(theme => theme.id));
      this.byId = new Map();
      this.cells = new Map();
      this.groups = [];
      const validSaved = saved?.version === this.version && saved.columns === this.columns && Array.isArray(saved.groups);
      let bottomEdge = 0;
      if (validSaved) {
        for (const group of saved.groups) {
          if (!this.themeIds.has(group.category) || !Number.isInteger(group.startRow) || group.startRow < bottomEdge ||
              !Number.isInteger(group.rows) || group.rows < 1 || group.rows > 10000 ||
              !Array.isArray(group.ids) || group.ids.length > group.rows * this.columns ||
              !group.ids.every(id => typeof id === 'string')) {
            this.groups = [];
            break;
          }
          this.groups.push({...group, ids: [...group.ids]});
          bottomEdge = group.startRow + group.rows;
        }
      }
      if (!this.groups.length) {
        for (const theme of themes) {
          const entries = words.filter(word => word.category === theme.id);
          if (entries.length) this.createGroup(theme.id, entries.map(word => word.id));
        }
      }
      const existing = new Set(this.groups.flatMap(group => group.ids));
      for (const word of words) if (!existing.has(word.id)) {
        this.appendId(word);
        existing.add(word.id);
      }
      this.reindex(words);
    }

    createGroup(category, ids) {
      const previous = this.groups.at(-1);
      const group = {
        category,
        startRow: previous ? previous.startRow + previous.rows + this.groupGap : 0,
        rows: Math.max(1, Math.ceil(ids.length / this.columns)) + this.reserveRows,
        ids: [...ids]
      };
      this.groups.push(group);
      return group;
    }

    appendId(word) {
      // Use the theme's reserved cells without shifting any existing category.
      const group = this.groups.find(group => group.category === word.category && group.ids.length < group.rows * this.columns);
      if (group) group.ids.push(word.id);
      else this.createGroup(word.category, [word.id]);
    }

    add(word, words) {
      if (this.byId.has(word.id)) return;
      this.appendId(word);
      this.reindex(words);
    }

    reindex(words) {
      this.byId.clear();
      this.cells.clear();
      const available = new Map(words.map(word => [word.id, word]));
      for (const group of this.groups) {
        group.count = 0;
        group.ids.forEach((id, index) => {
          const word = available.get(id);
          if (!word || word.category !== group.category || this.byId.has(id)) return;
          const row = group.startRow + Math.floor(index / this.columns);
          const column = index % this.columns;
          const cell = {column, row, x: this.padding + column * (this.width + this.gap), y: this.padding + this.headerHeight + row * (this.height + this.gap)};
          this.byId.set(id, cell);
          this.cells.set(row * this.columns + column, word);
          group.count++;
        });
      }
      const last = this.groups.at(-1);
      this.rows = last ? last.startRow + last.rows : 1;
      this.worldWidth = this.padding * 2 + this.columns * (this.width + this.gap) - this.gap;
      this.worldHeight = this.padding * 2 + this.headerHeight + this.rows * (this.height + this.gap) - this.gap;
    }

    positionOf(word) {
      const cell = this.byId.get(word.id);
      return {x: cell.x, y: cell.y};
    }

    orderOf(word) {
      const cell = this.byId.get(word.id);
      return cell.row * this.columns + cell.column;
    }

    wordAt(column, row) {
      if (column < 0 || column >= this.columns || row < 0 || row >= this.rows) return null;
      return this.cells.get(row * this.columns + column) || null;
    }

    boundsOfGroup(group) {
      return {
        left: this.padding - 12,
        top: this.padding + group.startRow * (this.height + this.gap) - 12,
        width: this.columns * (this.width + this.gap) - this.gap + 24,
        height: this.headerHeight + group.rows * (this.height + this.gap) - this.gap + 24
      };
    }

    snapshot() {
      return {version: this.version, columns: this.columns, groups: this.groups.map(({category, startRow, rows, ids}) => ({category, startRow, rows, ids: [...ids]}))};
    }
  }
  if (typeof module !== 'undefined' && module.exports) module.exports = GroupedWordLayout;
  else root.GroupedWordLayout = GroupedWordLayout;
})(globalThis);
