// script.js

// Set default "toDate" as current date on page load (without time)
document.addEventListener("DOMContentLoaded", function() {
  const toDateInput = document.getElementById('toDate');
  if (!toDateInput.value) {
    toDateInput.value = getCurrentDateLocal();
  }
});

function getCurrentDateLocal() {
  const date = new Date();
  const offset = date.getTimezoneOffset();
  date.setMinutes(date.getMinutes() - offset);
  return date.toISOString().split('T')[0];
}

document.getElementById('ageForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const fromDate = document.getElementById('fromDate').value;
  const toDate = document.getElementById('toDate').value || getCurrentDateLocal();

  if (!fromDate) {
    showError('Please enter your birth date');
    return;
  }

  const start = new Date(fromDate);
  const end = new Date(toDate);
  
  if (start >= end) {
    showError('Birth date must be before current date');
    return;
  }

  const { years, months, days } = calculateAge(start, end);
  showResult(years, months, days);
});

function calculateAge(start, end) {
  let years = end.getFullYear() - start.getFullYear();
  let monthDiff = end.getMonth() - start.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && end.getDate() < start.getDate())) {
    years--;
    monthDiff += 12;
  }
  
  let days = end.getDate() - start.getDate();
  if (days < 0) {
    const tempDate = new Date(end);
    tempDate.setMonth(end.getMonth() - 1);
    days = Math.floor((end - tempDate) / (1000 * 60 * 60 * 24)) + days;
  }

  return { years, months: monthDiff, days };
}

function showResult(y, m, d) {
  const result = document.getElementById('result');
  result.innerHTML = `
    <strong>Age is:</strong><br>
    ${y} years<br>
    ${m} months<br>
    ${d} days
  `;
}

function showError(message) {
  const result = document.getElementById('result');
  result.innerHTML = `<span class="error">${message}</span>`;
}

// Initialize toDate with current date
document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('toDate').value = getCurrentDateLocal();
}); 