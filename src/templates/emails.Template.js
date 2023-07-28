module.exports = {
    managerReplyLeaveDay: (title, message, status) => {
        return `
        <!DOCTYPE html>
        <html>
        
        <head>
            <title>Manager Reply</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    line-height: 1.5;
                }
        
                .container {
                    margin: 0 auto;
                    max-width: 600px;
                    padding: 20px;
                }
        
                .title {
                    font-size: 24px;
                    font-weight: bold;
                    margin-bottom: 20px;
                }
        
                .form-group {
                    margin-bottom: 20px;
                }
        
                .form-group label {
                    display: inline-block;
                    width: 120px;
                    font-weight: bold;
                }
        
                .form-group select,
                .form-group textarea {
                    display: block;
                    width: 100%;
                    padding: 5px;
                    border: 1px solid #ccc;
                }
        
                .submit-btn {
                    margin-top: 20px;
                }
            </style>
        </head>
        
        <body>
            <div class="container">
                <h2 class="title">Manager Reply</h2>
                <form action="process_reply.php" method="post">
                    <div class="form-group">
                        <label for="name">Title : ${title}</label>
                    </div>
                    <div class="form-group">
                        <label for="status">Status: ${status}</label>
                    </div>
                    <div class="form-group">
                        <label for="comment">Manager replied: ${message}</label>
                    </div>
                </form>
            </div>
        </body>
        
        </html>
            `
    },

    createAccount: (name, phone, password, role) => {
        return `
        <!DOCTYPE html>
        <html>,

        <head>
            <title>Email Notification</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    line-height: 1.5;
                }

                .container {
                    margin: 0 auto;
                    max-width: 600px;
                    padding: 20px;
                }

                .title {
                    font-size: 24px;
                    font-weight: bold;
                    margin-bottom: 20px;
                }

                .field {
                    margin-bottom: 10px;
                }

                .field label {
                    display: inline-block;
                    width: 120px;
                    font-weight: bold;
                }

                .field span {
                    font-weight: normal;
                }
            </style>
        </head>

        <body>
            <div class="container">
                <h1 class="title">Email Notification</h1>
                <div class="field">
                    <label>Name:</label>
                    <span>${name}</span>
                </div>
                <div class="field">
                    <label>Role:</label>
                    <span>${role}</span>
                </div>
                <div class="field">
                    <label>Account:</label>
                    <div>
                        <span>Phone: ${phone}</span><br>
                        <span>Password: ${password}</span>
                    </div>
                </div>
            </div>
        </body>

        </html>`
    },

    createLeaveForm: (title, message) => {
        return `
        <!DOCTYPE html>
        <html>
        
        <head>
            <title>Manager Reply</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    line-height: 1.5;
                }
        
                .container {
                    margin: 0 auto;
                    max-width: 600px;
                    padding: 20px;
                }
        
                .title {
                    font-size: 24px;
                    font-weight: bold;
                    margin-bottom: 20px;
                }
        
                .form-group {
                    margin-bottom: 20px;
                }
        
                .form-group label {
                    display: inline-block;
                    width: 120px;
                    font-weight: bold;
                }
        
                .form-group select,
                .form-group textarea {
                    display: block;
                    width: 100%;
                    padding: 5px;
                    border: 1px solid #ccc;
                }
        
                .submit-btn {
                    margin-top: 20px;
                }
            </style>
        </head>
        
        <body>
            <div class="container">
                <h2 class="title">Employee required leaved day</h2>
                <form action="process_reply.php" method="post">
                    <div class="form-group">
                        <label for="name">Title : ${title}</label>
                    </div>
                    <div class="form-group">
                        <label for="comment">Reason: ${message}</label>
                    </div>
                </form>
            </div>
        </body>
        
        </html>
            `
    },



}