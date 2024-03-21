'use strict';

{
  const tbody = document.querySelector('tbody');
  const row = document.getElementById('row');
  const column = document.getElementById('column');

  // 座席表の作成
  function createTable() {
    const rowNum = Number(row.value);
    const colNum = Number(column.value);
    const sum = rowNum * colNum;

    // 男子用と女子用のソースを用意する
    const source_a = [];
    const source_b = [];

    // 偶奇で2つのグループに分ける
    for (let i = 0; i < Math.floor(sum / 2); i++) {
      source_a[i] = i * 2 + 2;
      source_b[i] = i * 2 + 1;
    }
    if (sum % 2 != 0) {
      source_b.push(sum);
    }

    console.log(sum);
    console.log(source_b);

    // 座席表i行j列の値は、i+jが偶数ならば偶数の配列から選び、奇数ならば奇数の配列から選ぶ
    const table = [];
    for (let i = 0; i < rowNum; i++) {
      const row = [];
      for (let j = 0; j < colNum; j++) {
        if ((i + j) % 2 == 0) {
          row[j] = source_b.splice(Math.floor(Math.random() * source_b.length), 1)[0];
        }
        else {
          row[j] = source_a.splice(Math.floor(Math.random() * source_a.length), 1)[0];
        }
      }
      table[i] = row;
    }
    return table;
  }

  // 座席表の表示
  function renderTable(table) {
    const rowNum = Number(row.value);
    const colNum = Number(column.value);

    for (let i = 0; i < rowNum; i++) {
      const tr = document.createElement('tr');
      for (let j = 0; j < colNum; j++) {
        const td = document.createElement('td');
        td.textContent = table[i][j];
        // i+jが偶数ならばblueクラス、奇数ならばredクラスを付ける
        if ((i + j) % 2 == 0) {
          td.classList.add("blue");
        } else {
          td.classList.add("red");
        }
        tr.appendChild(td);
      }
      document.querySelector('tbody').appendChild(tr);
    }
  }

  let table = createTable();
  renderTable(table);


  // ボタンのシャッフル機能
  const shuffle = document.getElementById('shuffle');
  shuffle.addEventListener('click', () => {
    while (tbody.firstChild) {
      tbody.removeChild(tbody.firstChild);
    }
    table = createTable();
    renderTable(table);
  });


}