const mysql = require('mysql2');

// Create a MySQL connection
const connection = mysql.createConnection({
    host: 'tuankiet2s.onthewifi.com',
    user: 'ministoredb',
    password: 'WyPbzkDT752rtsw4',
    database: 'ministoredb',
});

// Test the MySQL connection
connection.connect((error) => {
    if (error) {
        console.error('Error connecting to MySQL:', error);
    } else {
        console.log('MySQL connection successful');
    }
    // Perform test query
    connection.query('SELECT * FROM Product', (error, results) => {
        if (error) {
            console.error('Error performing test query:', error);
        } else {
            const data = results.map(result => result.id);
            console.log(`Successfully retrieved ${data} rows from the database`);
        }
    });

    // Close the MySQL connection
    connection.end();
});
