import React from 'react';
import App from './App.js'

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
    }
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
      }
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
      }
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
      }
    });
  };

  // Check if any form has errors
  hasErrors = () => {
    return Object.values(this.state.errors).some(error => error !== '');
  };

  render() {
    return (
      <div>
        <div class='title'><h1>Sign Up Sheet</h1></div>

        <form onSubmit={this.onNameSubmit}>
          <input
            placeholder='Enter your name'
            value={this.state.currentName}
            onChange={this.handleNameChange}
          />
          <input 
            type='submit' 
            disabled={!!this.state.errors.name || !this.state.currentName}
          />
          {this.state.errors.name && <div style={{color: 'red'}}>{this.state.errors.name}</div>}
        </form>
        
        <form onSubmit={this.onEmailSubmit}>
          <input
            placeholder='Enter your email'
            value={this.state.currentEmail}
            onChange={this.handleEmailChange}
          />
          <input 
            type='submit' 
            disabled={!!this.state.errors.email || !this.state.currentEmail}
          />
          {this.state.errors.email && <div style={{color: 'red'}}>{this.state.errors.email}</div>}
        </form>        
        
        <form onSubmit={this.onNumberSubmit}>
          <input
            placeholder='Enter your phone number (10 digits)'
            value={this.state.currentNumber}
            onChange={this.handleNumberChange}
          />
          <input 
            type='submit' 
            disabled={!!this.state.errors.number || !this.state.currentNumber}
          />
          {this.state.errors.number && <div style={{color: 'red'}}>{this.state.errors.number}</div>}
        </form>

        <div class='NameTag'>
          <h3>Names</h3>
          <ul>
            {this.state.names.map((name, i) => <li key={i}>{name}</li>)}
          </ul>
        </div>
        
        <div>
          <h3>Emails</h3>
          <ul>
            {this.state.emails.map((email, i) => <li key={i}>{email}</li>)}
          </ul>
        </div>
        
        <div>
          <h3>Numbers</h3>
          <ul>
            {this.state.numbers.map((number, i) => <li key={i}>{number}</li>)}
          </ul>
        </div>

        {this.hasErrors() && (
          <div style={{color: 'red', marginTop: '20px'}}>
            Please fix all errors before submitting forms.
          </div>
        )}
      </div>
    );
  }
};

export default BasicForm;