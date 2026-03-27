/**
 * Expense Tracker - Martin's Budget
 * Paste into Extensions > Apps Script, then Run > createExpenseTracker
 */

function createExpenseTracker() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();

  // ─── SHEET 1 ─────────────────────────────────────────────────────────────────
  var sheet1 = ss.getSheets()[0];
  sheet1.clear();
  sheet1.clearFormats();
  sheet1.setName('October - June');

  // === MARTIN'S EXISTING NUMBERS (kept exactly) ===
  var incomeData    = [7500, 8000, 8500, 8000, 7500, 9000, 10000, 10000, 9000];
  var expenseData   = [3000, 2000, 2500, 3000, 4000, 4500,  5000,  1000, 4750];
  var months        = ['October','November','December','January','February','March','April','May','June'];

  // ── Title ──────────────────────────────────────────────────────────────────
  sheet1.getRange('A1').setValue("Martin's budget")
    .setFontSize(16).setFontWeight('bold').setFontColor('#1a4d3a');

  // ── Expense Detail Table (10 sample entries) ───────────────────────────────
  // Headers row 3
  var detailHeaders = ['#', 'Month', 'Description', 'Category', 'Amount'];
  var hRange = sheet1.getRange(3, 1, 1, 5);
  hRange.setValues([detailHeaders]);
  hRange.setBackground('#1a4d3a').setFontColor('#ffffff')
        .setFontWeight('bold').setFontSize(11)
        .setHorizontalAlignment('center')
        .setBorder(true, true, true, true, true, true);

  // 10 sample expense entries
  var expenses = [
    [1,  'October',  'Apartment Rent',        'Housing',       1200],
    [2,  'October',  'Groceries',             'Food',           380],
    [3,  'November', 'Apartment Rent',        'Housing',       1200],
    [4,  'November', 'Utilities',             'Utilities',      200],
    [5,  'December', 'Apartment Rent',        'Housing',       1200],
    [6,  'December', 'Christmas Gifts',       'Shopping',       350],
    [7,  'January',  'Apartment Rent',        'Housing',       1200],
    [8,  'February', 'Groceries',             'Food',           420],
    [9,  'March',    'Transport Pass',        'Transport',       75],
    [10, 'June',     'Vacation Deposit',      'Travel',         800]
  ];

  var N = expenses.length;
  var DATA_START = 4;
  var DATA_END   = DATA_START + N - 1;

  sheet1.getRange(DATA_START, 1, N, 5).setValues(expenses);

  // Alternating row colors
  for (var i = 0; i < N; i++) {
    sheet1.getRange(DATA_START + i, 1, 1, 5)
      .setBackground(i % 2 === 0 ? '#e8f5e9' : '#ffffff');
  }
  // Amount column format
  sheet1.getRange(DATA_START, 5, N, 1).setNumberFormat('"BGN "#,##0.00');

  // Border around full detail table
  sheet1.getRange(3, 1, N + 1, 5)
    .setBorder(true, true, true, true, true, true);

  // ── Lookup table for VLOOKUP (cols G-I) ───────────────────────────────────
  sheet1.getRange('G2').setValue('Lookup Table (for VLOOKUP)')
    .setFontStyle('italic').setFontColor('#666666').setFontSize(9);

  var lhRange = sheet1.getRange(3, 7, 1, 3);
  lhRange.setValues([['#', 'Category', 'Amount']]);
  lhRange.setBackground('#c9a84c').setFontWeight('bold').setHorizontalAlignment('center')
         .setBorder(true, true, true, true, true, true);

  var lookupData = expenses.map(function(r){ return [r[0], r[3], r[4]]; });
  var ltRange = sheet1.getRange(DATA_START, 7, N, 3);
  ltRange.setValues(lookupData);
  ltRange.setBorder(true, true, true, true, true, true);
  sheet1.getRange(DATA_START, 9, N, 1).setNumberFormat('"BGN "#,##0.00');

  // Alternating colors for lookup table
  for (var i = 0; i < N; i++) {
    sheet1.getRange(DATA_START + i, 7, 1, 3)
      .setBackground(i % 2 === 0 ? '#fdf8e1' : '#ffffff');
  }

  // ── VLOOKUP results section (cols K-M) ────────────────────────────────────
  sheet1.getRange('K2').setValue('VLOOKUP Results')
    .setFontStyle('italic').setFontColor('#666666').setFontSize(9);

  var vlHeaders = [['#', 'Category (VLOOKUP)', 'Amount (VLOOKUP)']];
  var vlhRange = sheet1.getRange(3, 11, 1, 3);
  vlhRange.setValues(vlHeaders);
  vlhRange.setBackground('#1a4d3a').setFontColor('#ffffff').setFontWeight('bold')
          .setHorizontalAlignment('center')
          .setBorder(true, true, true, true, true, true);

  var lookupRef = '$G$' + DATA_START + ':$I$' + DATA_END;
  for (var i = 0; i < N; i++) {
    var row = DATA_START + i;
    sheet1.getRange(row, 11).setValue(i + 1);
    sheet1.getRange(row, 12).setFormula('=VLOOKUP(K' + row + ',' + lookupRef + ',2,0)');
    sheet1.getRange(row, 13).setFormula('=VLOOKUP(K' + row + ',' + lookupRef + ',3,0)');
    sheet1.getRange(row, 13).setNumberFormat('"BGN "#,##0.00');
    sheet1.getRange(row, 11, 1, 3)
      .setBackground(i % 2 === 0 ? '#e8f5e9' : '#ffffff');
  }
  sheet1.getRange(3, 11, N + 1, 3)
    .setBorder(true, true, true, true, true, true);

  // ── Monthly Income / Expense / Total summary ───────────────────────────────
  var SUMMARY_ROW = DATA_END + 3;

  // Section title
  sheet1.getRange(SUMMARY_ROW - 1, 1).setValue('MONTHLY SUMMARY')
    .setFontWeight('bold').setFontSize(12).setFontColor('#1a4d3a');

  // Headers
  var sumHeaders = [['Month', 'Income', 'Expenses', 'Total Expenses']];
  var sumHRange = sheet1.getRange(SUMMARY_ROW, 1, 1, 4);
  sumHRange.setValues(sumHeaders);
  sumHRange.setBackground('#1a4d3a').setFontColor('#ffffff').setFontWeight('bold')
           .setHorizontalAlignment('center');

  for (var m = 0; m < months.length; m++) {
    var sr = SUMMARY_ROW + 1 + m;
    sheet1.getRange(sr, 1).setValue(months[m]);
    sheet1.getRange(sr, 2).setValue(incomeData[m]).setNumberFormat('"BGN "#,##0.00');
    sheet1.getRange(sr, 3).setValue(expenseData[m]).setNumberFormat('"BGN "#,##0.00');
    sheet1.getRange(sr, 4).setFormula('=C' + sr + '-B' + sr).setNumberFormat('"BGN "#,##0.00');
    sheet1.getRange(sr, 1, 1, 4)
      .setBackground(m % 2 === 0 ? '#f0f7f0' : '#ffffff');
  }

  // Total row
  var totalRow = SUMMARY_ROW + 1 + months.length;
  sheet1.getRange(totalRow, 1).setValue('TOTAL');
  sheet1.getRange(totalRow, 2).setFormula('=SUM(B' + (SUMMARY_ROW+1) + ':B' + (totalRow-1) + ')').setNumberFormat('"BGN "#,##0.00');
  sheet1.getRange(totalRow, 3).setFormula('=SUM(C' + (SUMMARY_ROW+1) + ':C' + (totalRow-1) + ')').setNumberFormat('"BGN "#,##0.00');
  sheet1.getRange(totalRow, 4).setFormula('=SUM(D' + (SUMMARY_ROW+1) + ':D' + (totalRow-1) + ')').setNumberFormat('"BGN "#,##0.00');
  sheet1.getRange(totalRow, 1, 1, 4).setBackground('#c9a84c').setFontWeight('bold').setFontSize(11);

  sheet1.getRange(SUMMARY_ROW, 1, months.length + 2, 4)
    .setBorder(true, true, true, true, true, true);

  // ── Column widths ──
  sheet1.setColumnWidth(1,  45);
  sheet1.setColumnWidth(2, 110);
  sheet1.setColumnWidth(3, 220);
  sheet1.setColumnWidth(4, 130);
  sheet1.setColumnWidth(5, 130);
  sheet1.setColumnWidth(6,  15);  // gap
  sheet1.setColumnWidth(7,  45);
  sheet1.setColumnWidth(8, 130);
  sheet1.setColumnWidth(9, 130);
  sheet1.setColumnWidth(10, 15);  // gap
  sheet1.setColumnWidth(11, 45);
  sheet1.setColumnWidth(12, 180);
  sheet1.setColumnWidth(13, 180);

  sheet1.setFrozenRows(3);

  // ── Page setup: Landscape, fit to 1 page ──
  // (Set manually via File > Print > Layout: Landscape, Scale: Fit to page)

  // ─── SHEET 2: Expenses Summary ──────────────────────────────────────────────
  var sheet2 = ss.getSheetByName('Expenses Summary');
  if (!sheet2) sheet2 = ss.insertSheet('Expenses Summary');
  else { sheet2.clear(); sheet2.clearFormats(); }

  // Title
  sheet2.getRange('A1:E1').merge();
  sheet2.getRange('A1').setValue("EXPENSE SUMMARY – MARTIN'S BUDGET")
    .setFontSize(14).setFontWeight('bold').setFontColor('#1a4d3a')
    .setHorizontalAlignment('center');

  sheet2.getRange('A2').setValue('Period: October – June')
    .setFontStyle('italic').setFontColor('#555555');

  // Category summary headers
  var catHeaders = [['Category', 'Total Spent (BGN)', '% of Total Expenses']];
  var chRange = sheet2.getRange(4, 1, 1, 3);
  chRange.setValues(catHeaders);
  chRange.setBackground('#1a4d3a').setFontColor('#ffffff').setFontWeight('bold')
         .setHorizontalAlignment('center').setBorder(true, true, true, true, true, true);

  var categories = ['Housing', 'Food', 'Utilities', 'Transport', 'Shopping', 'Travel'];
  var catAmounts  = [
    expenses.filter(function(r){ return r[3]==='Housing';   }).reduce(function(s,r){ return s+r[4]; }, 0),
    expenses.filter(function(r){ return r[3]==='Food';      }).reduce(function(s,r){ return s+r[4]; }, 0),
    expenses.filter(function(r){ return r[3]==='Utilities'; }).reduce(function(s,r){ return s+r[4]; }, 0),
    expenses.filter(function(r){ return r[3]==='Transport'; }).reduce(function(s,r){ return s+r[4]; }, 0),
    expenses.filter(function(r){ return r[3]==='Shopping';  }).reduce(function(s,r){ return s+r[4]; }, 0),
    expenses.filter(function(r){ return r[3]==='Travel';    }).reduce(function(s,r){ return s+r[4]; }, 0)
  ];
  var catTotal = catAmounts.reduce(function(s,v){ return s+v; }, 0);

  for (var c = 0; c < categories.length; c++) {
    var cr = 5 + c;
    sheet2.getRange(cr, 1).setValue(categories[c]);
    sheet2.getRange(cr, 2).setValue(catAmounts[c]).setNumberFormat('"BGN "#,##0.00');
    sheet2.getRange(cr, 3).setValue(catAmounts[c] / catTotal).setNumberFormat('0.0%');
    sheet2.getRange(cr, 1, 1, 3).setBackground(c % 2 === 0 ? '#e8f5e9' : '#ffffff');
  }

  // Grand total
  var grandRow2 = 5 + categories.length;
  sheet2.getRange(grandRow2, 1).setValue('GRAND TOTAL');
  sheet2.getRange(grandRow2, 2).setFormula('=SUM(B5:B' + (grandRow2-1) + ')').setNumberFormat('"BGN "#,##0.00');
  sheet2.getRange(grandRow2, 3).setValue(1).setNumberFormat('0.0%');
  sheet2.getRange(grandRow2, 1, 1, 3).setBackground('#c9a84c').setFontWeight('bold').setFontSize(11);

  sheet2.getRange(4, 1, categories.length + 2, 3)
    .setBorder(true, true, true, true, true, true);

  // Monthly totals table (for chart)
  sheet2.getRange('A' + (grandRow2 + 2)).setValue('MONTHLY EXPENSE TOTALS')
    .setFontWeight('bold').setFontColor('#1a4d3a');
  var mhRange = sheet2.getRange(grandRow2 + 3, 1, 1, 2);
  mhRange.setValues([['Month', 'Total Expenses (BGN)']]);
  mhRange.setBackground('#1a4d3a').setFontColor('#ffffff').setFontWeight('bold');

  var MONTHLY_DATA_START = grandRow2 + 4;
  for (var m = 0; m < months.length; m++) {
    var mr = MONTHLY_DATA_START + m;
    sheet2.getRange(mr, 1).setValue(months[m]);
    sheet2.getRange(mr, 2).setValue(expenseData[m]).setNumberFormat('"BGN "#,##0.00');
    sheet2.getRange(mr, 1, 1, 2).setBackground(m % 2 === 0 ? '#e8f5e9' : '#ffffff');
  }
  sheet2.getRange(grandRow2 + 3, 1, months.length + 1, 2)
    .setBorder(true, true, true, true, true, true);

  // Column widths for sheet 2
  sheet2.setColumnWidth(1, 180);
  sheet2.setColumnWidth(2, 185);
  sheet2.setColumnWidth(3, 185);

  // ── Line Chart on Sheet 2 (monthly expense totals) ──
  var chartRange = sheet2.getRange(grandRow2 + 3, 1, months.length + 1, 2);
  var chart = sheet2.newChart()
    .setChartType(Charts.ChartType.LINE)
    .addRange(chartRange)
    .setPosition(4, 5, 10, 10)
    .setOption('title', "Monthly Expense Totals – Martin's Budget")
    .setOption('hAxis.title', 'Month')
    .setOption('vAxis.title', 'Total Expenses (BGN)')
    .setOption('legend', { position: 'none' })
    .setOption('width',  660)
    .setOption('height', 400)
    .setOption('colors', ['#1a4d3a'])
    .setOption('pointSize', 7)
    .setOption('lineWidth', 3)
    .build();
  sheet2.insertChart(chart);

  // ── Page setup sheet 2 ──
  // (Set manually via File > Print > Layout: Landscape, Scale: Fit to page)

  ss.setActiveSheet(sheet1);
  SpreadsheetApp.flush();

  SpreadsheetApp.getUi().alert(
    '✅ Done!\n\n' +
    '• Sheet 1 "October - June": 10 expense entries, VLOOKUP section, monthly summary with Martin\'s original numbers, alternating colors\n' +
    '• Sheet 2 "Expenses Summary": category breakdown + line chart of monthly totals\n\n' +
    '📄 To set Landscape + Fit to page: File > Print > change Layout to Landscape and Scale to "Fit to page"'
  );
}
