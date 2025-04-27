import React from 'react';
import './App.css';

class BasicForm extends React.Component {
  static displayName = "basic-input";
  state = { 
    names: [],
    emails: [],
    numbers: [],
    currentName: '',
    currentEmail: '',
    currentNumber: '',
    errors: {
      name: '',
      email: '',
      number: ''
    },
    submitted: false
  };

  // Validation functions
  validateName = (name) => {
    if (!name) return 'Name is required';
    if (name.length < 2) return 'Name must be at least 2 characters';
    if (!/^[a-zA-Z\s]+$/.test(name)) return 'Name can only contain letters and spaces';
    return '';
  };

  validateEmail = (email) => {
    if (!email) return 'Email is required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return 'Please enter a valid email';
    return '';
  };

  validateNumber = (number) => {
    if (!number) return 'Phone number is required';
    if (!/^\d{10}$/.test(number)) return 'Phone must be 10 digits';
    return '';
  };

  // Real-time validation handlers
  handleNameChange = (e) => {
    const name = e.target.value;
    this.setState({
      currentName: name,
      errors: {
        ...this.state.errors,
        name: this.validateName(name)
      }
    });
  };

  handleEmailChange = (e) => {
    const email = e.target.value;
    this.setState({
      currentEmail: email,
      errors: {
        ...this.state.errors,
        email: this.validateEmail(email)
      }
    });
  };

  handleNumberChange = (e) => {
    const number = e.target.value;
    this.setState({
      currentNumber: number,
      errors: {
        ...this.state.errors,
        number: this.validateNumber(number)
      }
    });
  };

  // Form submission handlers
  onNameSubmit = (evt) => {
    evt.preventDefault();
    const error = this.validateName(this.state.currentName);
    if (error) {
      this.setState({
        errors: {
          ...this.state.errors,
          name: error
        }
      });
      return;
    }
    
    this.setState({
      names: [...this.state.names, this.state.currentName],
      currentName: '',
      errors: {
        ...this.state.errors,
        name: ''
      },
      submitted: true
    });
  };

  onEmailSubmit = (evt) => {
    evt.preventDefault();
    const error = this.validateEmail(this.state.currentEmail);
    if (error) {
      this.setState({
        errors: {
          ...this.state.errors,
          email: error
        }
      });
      return;
    }
    
    this.setState({
      emails: [...this.state.emails, this.state.currentEmail],
      currentEmail: '',
      errors: {
        ...this.state.errors,
        email: ''
      },
      submitted: true
    });
  };

  onNumberSubmit = (evt) => {
    evt.preventDefault();
    const error = this.validateNumber(this.state.currentNumber);
    if (error) {
      this.setState({
        errors: {
          ...this.state.errors,
          number: error
        }
      });
      return;
    }
    
    this.setState({
      numbers: [...this.state.numbers, this.state.currentNumber],
      currentNumber: '',
      errors: {
        ...this.state.errors,
        number: ''
      },
      submitted: true
    });
  };

  hasErrors = () => {
    return Object.values(this.state.errors).some(error => error !== '');
  };

  render() {
    return (
      <div className="form-container">
        <div className='header'>
          <h1>Availbility Slot</h1>
          <p>Enter your name below to enter the Chief Chimi Special</p>
        </div>
        
        <div className="forms-section">
          <div className="input-forms">
            <form onSubmit={this.onNameSubmit} className="form-card">
              <h3>Name</h3>
              <input
                className="form-input"
                placeholder='John Doe'
                value={this.state.currentName}
                onChange={this.handleNameChange}
              />
              <button 
                type='submit' 
                className="submit-btn"
                disabled={!!this.state.errors.name || !this.state.currentName}
              >
                Add Name
              </button>
              {this.state.errors.name && <div className="error-message">{this.state.errors.name}</div>}
            </form>
            
            <form onSubmit={this.onEmailSubmit} className="form-card">
              <h3>Email</h3>
              <input
                className="form-input"
                placeholder='john@example.com'
                value={this.state.currentEmail}
                onChange={this.handleEmailChange}
              />
              <button 
                type='submit' 
                className="submit-btn"
                disabled={!!this.state.errors.email || !this.state.currentEmail}
              >
                Add Email
              </button>
              {this.state.errors.email && <div className="error-message">{this.state.errors.email}</div>}
            </form>        
            
            <form onSubmit={this.onNumberSubmit} className="form-card">
              <h3>Phone Number</h3>
              <input
                className="form-input"
                placeholder='1234567890'
                value={this.state.currentNumber}
                onChange={this.handleNumberChange}
              />
              <button 
                type='submit' 
                className="submit-btn"
                disabled={!!this.state.errors.number || !this.state.currentNumber}
              >
                Add Number
              </button>
              {this.state.errors.number && <div className="error-message">{this.state.errors.number}</div>}
            </form>
          </div>

          <div className="results-section">
            <div className="results-card">
              <h3>Registered Names</h3>
              <ul className="results-list">
                {this.state.names.length > 0 ? (
                  this.state.names.map((name, i) => <li key={i}>{name}</li>)
                ) : (
                  <li className="empty-message">No names submitted yet</li>
                )}
              </ul>
            </div>
            
            <div className="results-card">
              <h3>Registered Emails</h3>
              <ul className="results-list">
                {this.state.emails.length > 0 ? (
                  this.state.emails.map((email, i) => <li key={i}>{email}</li>)
                ) : (
                  <li className="empty-message">No emails submitted yet</li>
                )}
              </ul>
            </div>
            
            <div className="results-card">
              <h3>Registered Numbers</h3>
              <ul className="results-list">
                {this.state.numbers.length > 0 ? (
                  this.state.numbers.map((number, i) => <li key={i}>{number}</li>)
                ) : (
                  <li className="empty-message">No numbers submitted yet</li>
                )}
              </ul>
            </div>
          </div>
        </div>

        {this.hasErrors() && (
          <div className="error-banner">
            Please fix all errors before submitting forms.
          </div>
        )}

        {this.state.submitted && !this.hasErrors() && (
          <div className="success-banner">
            Thank you for your submission!
          </div>
        )}
      </div>
    );
  }
};

export default BasicForm;