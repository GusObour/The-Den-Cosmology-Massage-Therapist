$(document).ready(function () {
    // Load the Google Calendar API library
gapi.load('client:auth2', initGoogleCalendar);

// Initialize Google Calendar API
function initGoogleCalendar() {
  gapi.client.init({
    apiKey: 'YOUR_API_KEY',
    clientId: 'YOUR_CLIENT_ID',
    discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'],
    scope: 'https://www.googleapis.com/auth/calendar.events'
  }).then(function () {
    // Google Calendar API is ready for use
    // Perform any further actions here
  }).catch(function (error) {
    console.log('Error initializing Google Calendar API:', error);
  });
}

// Authenticate and authorize the user
function authenticateGoogleCalendar() {
  return gapi.auth2.getAuthInstance().signIn();
}

// Create a new event in Google Calendar
function createEvent(summary, description, startDateTime, endDateTime) {
  return gapi.client.calendar.events.insert({
    calendarId: 'primary',
    resource: {
      summary: summary,
      description: description,
      start: { dateTime: startDateTime },
      end: { dateTime: endDateTime }
    }
  });
}

// Delete an event from Google Calendar
function deleteEvent(eventId) {
  return gapi.client.calendar.events.delete({
    calendarId: 'primary',
    eventId: eventId
  });
}

// Update an event in Google Calendar
function updateEvent(eventId, summary, description, startDateTime, endDateTime) {
  return gapi.client.calendar.events.update({
    calendarId: 'primary',
    eventId: eventId,
    resource: {
      summary: summary,
      description: description,
      start: { dateTime: startDateTime },
      end: { dateTime: endDateTime }
    }
  });
}

// Example usage:
// Assuming you have a form with input fields for event details: summary, description, startDateTime, endDateTime

// Handle form submission
document.getElementById('eventForm').addEventListener('submit', function (event) {
  event.preventDefault();

  authenticateGoogleCalendar()
    .then(function () {
      var summary = document.getElementById('summary').value;
      var description = document.getElementById('description').value;
      var startDateTime = document.getElementById('startDateTime').value;
      var endDateTime = document.getElementById('endDateTime').value;

      createEvent(summary, description, startDateTime, endDateTime)
        .then(function (response) {
          console.log('Event created:', response);
          // Handle success
        })
        .catch(function (error) {
          console.log('Error creating event:', error);
          // Handle error
        });
    })
    .catch(function (error) {
      console.log('Error authenticating Google Calendar:', error);
      // Handle error
    });
});

// Example for deleting an event
var eventId = 'YOUR_EVENT_ID';
authenticateGoogleCalendar()
  .then(function () {
    deleteEvent(eventId)
      .then(function (response) {
        console.log('Event deleted:', response);
        // Handle success
      })
      .catch(function (error) {
        console.log('Error deleting event:', error);
        // Handle error
      });
  })
  .catch(function (error) {
    console.log('Error authenticating Google Calendar:', error);
    // Handle error
  });

// Example for updating an event
var eventId = 'YOUR_EVENT_ID';
var summary = 'Updated Summary';
var description = 'Updated Description';
var startDateTime = '2023-05-20T10:00:00';
var endDateTime = '2023-05-20T12:00:00';
authenticateGoogleCalendar()
  .then(function () {
    updateEvent(eventId, summary, description, startDateTime, endDateTime)
      .then(function (response) {
        console.log('Event updated:', response);
        // Handle success
      })
      .catch(function (error) {
        console.log('Error updating event:', error);
        // Handle error
      });
  })
  .catch(function (error) {
    console.log('Error authenticating Google Calendar:', error);
    // Handle error
  });

document.addEventListener('DOMContentLoaded', function() {
    var searchInput = document.getElementById('searchInput');

    searchInput.addEventListener('keyup', function() {
      var searchText = searchInput.value.toLowerCase();
      var services = document.querySelectorAll('.service');

      services.forEach(function(service) {
        var serviceName = service.querySelector('h3').textContent.toLowerCase();
        if (serviceName.includes(searchText)) {
          service.style.display = 'block';
        } else {
          service.style.display = 'none';
        }
      });
    });
  });

  // Get the calendar container element
const calendarContainer = document.getElementById('calendar');

// Function to generate the calendar
function generateCalendar(year, month) {
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayIndex = new Date(year, month, 1).getDay();
  
  // Clear the calendar body
  const calendarBody = calendarContainer.querySelector('.calendar-dates');
  calendarBody.innerHTML = '';
  
  // Generate the calendar dates
  for (let i = 0; i < firstDayIndex; i++) {
    const dateCell = document.createElement('div');
    dateCell.classList.add('date');
    calendarBody.appendChild(dateCell);
  }
  
  for (let i = 1; i <= daysInMonth; i++) {
    const dateCell = document.createElement('div');
    dateCell.classList.add('date');
    dateCell.textContent = i;
    calendarBody.appendChild(dateCell);
  }
  
  // Highlight the current date
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  
  if (currentMonth === month && currentYear === year) {
    const today = currentDate.getDate();
    const dateCells = calendarBody.querySelectorAll('.date');
    
    dateCells.forEach(dateCell => {
      if (parseInt(dateCell.textContent) === today) {
        dateCell.classList.add('current-date');
      }
    });
  }
  
  // Update the month and year in the calendar header
  const monthYearElement = calendarContainer.querySelector('#month-year');
  monthYearElement.textContent = `${getMonthName(month)} ${year}`;
}

// Function to get the name of the month
function getMonthName(month) {
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  return months[month];
}

// Function to handle previous month navigation
function navigatePrevious() {
  const monthYearElement = calendarContainer.querySelector('#month-year');
  const [month, year] = monthYearElement.textContent.split(' ');
  const prevMonth = parseInt(month) - 2;
  const prevYear = parseInt(year);
  
  generateCalendar(prevYear, prevMonth);
}

// Function to handle next month navigation
function navigateNext() {
  const monthYearElement = calendarContainer.querySelector('#month-year');
  const [month, year] = monthYearElement.textContent.split(' ');
  const nextMonth = parseInt(month);
  const nextYear = parseInt(year);
  
  generateCalendar(nextYear, nextMonth);
}

// Attach event listeners to the previous and next buttons
const prevButton = calendarContainer.querySelector('#prev-btn');
prevButton.addEventListener('click', navigatePrevious);

const nextButton = calendarContainer.querySelector('#next-btn');
nextButton.addEventListener('click', navigateNext);

// Get the current month and year
const currentDate = new Date();
const currentMonth = currentDate.getMonth();
const currentYear = currentDate.getFullYear();

// Generate the initial calendar
generateCalendar(currentYear, currentMonth);

});