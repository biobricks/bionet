import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Bootstrap.scss';

/********/
/* Grid */
/********/

export const Container = class Container extends Component {
  render() {
    const defaultClasses = "Container container-fluid";
    const classes = this.props.className ? `${defaultClasses} ${this.props.className}` : defaultClasses;
    return (
      <div className={classes}>{ this.props.children }</div>
    );
  }
}

export const Row = class Row extends Component {
  render() {
    const defaultClasses = "Row row";
    const classes = this.props.className ? `${defaultClasses} ${this.props.className}` : defaultClasses;
    return (
      <div className={classes}>{ this.props.children }</div>
    );
  }
}

export const Column = class Column extends Component {
  render() {
    const defaultClasses = "Column";
    let colPropClasses = defaultClasses;
    colPropClasses += this.props.col ? ` col-${this.props.col}` : ' col';
    colPropClasses += this.props.colSm ? ` col-sm-${this.props.colSm}` : '';
    colPropClasses += this.props.colMd ? ` col-md-${this.props.colMd}` : '';
    colPropClasses += this.props.colLg ? ` col-lg-${this.props.colLg}` : '';
    colPropClasses += this.props.colXl ? ` col-xl-${this.props.colXl}` : ''; 
    let classes = this.props.className ? `${colPropClasses} ${this.props.className}` : colPropClasses;
    return (
      <div className={classes}>{ this.props.children }</div>
    );
  }
}



/**************/
/* Components */
/**************/

export const Card = class Card extends Component {
  render() {
    const defaultClasses = "Card card";
    const classes = this.props.className ? `${defaultClasses} ${this.props.className}` : defaultClasses;
    return (
      <div className={classes}>
        { this.props.title && (
          <div className="card-header bg-dark text-light">
            {this.props.icon && <i className={`mdi mdi-${this.props.icon} mr-1`} /> }
            {this.props.title}
          </div>
        )}  
        <div className="card-body">
          {this.props.children}
        </div>
      </div>
    );
  }
}

export const NavbarBrand = class NavbarBrand extends Component {
  render() {
    const defaultClasses = "NavbarBrand navbar-brand";
    const classes = this.props.className ? `${defaultClasses} ${this.props.className}` : defaultClasses;
    return (
      <div className={classes}>
        <Link className={classes} to="/">
          {(this.props.imgSrc) ? (
            <>  
              <img 
                src={this.props.imgSrc} 
                width={this.props.width || "30"} 
                height={this.props.height || "30"}
                alt={this.props.imgAlt}
                className="mr-3"
              />
              {this.props.children}
            </>
          ) : (
            <>
              {this.props.children}
            </>
          )}
        </Link>        
      </div>
    );
  }
}

export const NavbarLink = class NavbarLink extends Component {
  render() {
    const liClasses = "NavbarLink nav-item";
    const classes = this.props.className ? `${liClasses} ${this.props.className}` : liClasses;
    return (
      <li className={classes}>
        <NavLink to={this.props.to} className="nav-link">
          {this.props.children}
        </NavLink>        
      </li>
    );
  }
}

export const NavbarDropdown = class NavbarDropdown extends Component {
  render() {
    let liClasses = "nav-item dropdown";
    let iconClasses = "";
    if (this.props.className) { liClasses += ` ${this.props.className}` }
    let hasIcon = this.props.icon && this.props.icon.length > 0;
    if (hasIcon) { iconClasses += `mdi mdi-${this.props.icon} mr-1` }
    return (
      <li className={liClasses}>
        <button 
          className="nav-link dropdown-toggle text-capitalize bg-dark border-0" 
          id={this.props.id}
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          { hasIcon && <i className={iconClasses} /> }
          {this.props.label}
        </button>
        <div 
          className="dropdown-menu"
          aria-labelledby={this.props.id}
        >
          {this.props.children}
        </div>
      </li>
    );
  }      
}

export const NavbarDropdownLink = class NavbarDropdownLink extends Component {
  render() {
    let classes = "dropdown-item";
    let iconClasses = "";
    let hasIcon = this.props.icon && this.props.icon.length > 0;
    if (hasIcon) { iconClasses += `mdi mdi-${this.props.icon} mr-1` }
    if (this.props.className) { classes += ` ${this.props.className}` }
    return (
      <NavLink to={this.props.to} className={classes}>
        { hasIcon && <i className={iconClasses} /> }
        {this.props.label}
      </NavLink>
    );
  }      
}


export const Navbar = class Navbar extends Component {
  render() {
    const defaultClasses = "Navbar navbar navbar-expand-lg navbar-dark bg-dark";
    const classes = this.props.className ? `${defaultClasses} ${this.props.className}` : defaultClasses;
    return (
      <div className={classes}>
        <NavbarBrand
          imgSrc={this.props.brandImgSrc}
          width={this.props.brandWidth}
          height={this.props.brandHeight}
          to="/"
        ></NavbarBrand>
        <button 
          className="navbar-toggler"
          type="button" 
          data-toggle="collapse"
          data-target={`#primary-navigation-links`} 
          aria-controls={`primary-navigation-links`} 
          aria-expanded="false" 
          aria-label="Toggle Primary Navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="primary-navigation-links">
          <ul className="navbar-nav ml-auto">
            {this.props.children}
          </ul>
        </div>
      </div>
    );
  }
}

export const AppFooter = class AppFooter extends Component {
  render() {
    let classes = "Footer bg-dark text-light p-3";
    if (this.props.className) { classes += ` ${this.props.className}` }
    return (
      <div className={classes}>
        {this.props.children}
      </div>
    );
  }      
}

export const Button = class Button extends Component {
  render() {
    let classes = "btn rounded-0";
    if (this.props.color) { 
      if (this.props.outline) {
        classes += ` btn-outline-${this.props.color}`;
      } else {
        classes += ` btn-${this.props.color}`;
      }
    }
    if (this.props.className) { classes += ` ${this.props.className}` }
    if (this.props.link) {
      return (
        <Link
          to={this.props.to}
          className={classes}
        >
          {this.props.children}
        </Link>
      );
    } else {
      if (this.props.submit) {
        return (
          <button
            className={classes}
            type="submit"
          >
            {this.props.children}
          </button>
        )
      } else {
        return (
          <button
            className={classes}
            onClick={this.props.onClick}
            mode={this.props.mode}
          >
            {this.props.children}
          </button>
        );
      }  
    }
  }
}

export const ButtonGroup = class ButtonGroup extends Component {
  render() {
    let classes = "btn-group";
    if (this.props.className) { classes += ` ${this.props.className}` }
    return (
      <div
        className={classes}
        role="group"
        aria-label={this.props.label}
      >
        {this.props.children}
      </div>
    );
  }
}



/****************************************************************/
/* Forms                                                        */
/****************************************************************/
export const Form = class Form extends Component {
  render() {
    let classes = "form";
    if (this.props.className) { classes += ` ${this.props.className}` }
    return (
      <form style={this.props.style} className={classes} onSubmit={this.props.onSubmit}>
        {this.props.children}
      </form>
    );
  }
}


export const FormGroup = class FormGroup extends Component {
  render() {
    let classes = "form-group";
    if (this.props.className) { classes += ` ${this.props.className}` }
    return (
      <div className={classes}>
        {this.props.children}
      </div>
    );
  }
}

export const InputTextArea = class InputTextArea extends Component {
  render() {
    let classes = "form-group";
    if (this.props.className) { classes += ` ${this.props.className}` }
    const instructions = this.props.instructions ? ( <small className="form-text text-muted">{this.props.instructions}</small> ) : null;
    const error = this.props.error ? ( <small className="form-text text-danger">{this.props.error}</small> ) : null;
    return (
      <div className={classes}>
        <label className="text-capitalize" htmlFor={this.props.attribute}>{this.props.label}</label>
        <textarea 
          type="textarea" 
          name={this.props.attribute}
          placeholder={this.props.placeholder}
          rows={this.props.rows || 3}
          className="form-control" 
          value={this.props.value}
          onChange={this.props.onChange} 
        ></textarea>
        {instructions}
        {error}
      </div>
    );
  }
}

export const InputText = class InputText extends Component {
  render() {
    let classes = "form-group";
    if (this.props.className) { classes += ` ${this.props.className}` }
    const instructions = this.props.instructions ? ( <small className="form-text text-muted">{this.props.instructions}</small> ) : null;
    const error = this.props.error ? ( <small className="form-text text-danger">{this.props.error}</small> ) : null;
    return (
      <div className={classes}>
        <label className="text-capitalize" htmlFor={this.props.attribute}>{this.props.label}</label>
        <input 
          type="text"
          className="form-control"
          name={this.props.attribute} 
          placeholder={this.props.placeholder}
          value={this.props.value}
          onChange={this.props.onChange}            
        />
        {instructions}
        {error}
      </div>
    );      
  }
}

export const InputPassword = class InputText extends Component {
  render() {
    let classes = "form-group";
    if (this.props.className) { classes += ` ${this.props.className}` }
    const instructions = this.props.instructions ? ( <small className="form-text text-muted">{this.props.instructions}</small> ) : null;
    const error = this.props.error ? ( <small className="form-text text-danger">{this.props.error}</small> ) : null;
    return (
      <div className={classes}>
        <label className="text-capitalize" htmlFor={this.props.attribute}>{this.props.label}</label>
        <input 
          type="password"
          className="form-control"
          name={this.props.attribute} 
          placeholder={this.props.placeholder}
          value={this.props.value}
          onChange={this.props.onChange}            
        />
        {instructions}
        {error}
      </div>
    );      
  }
}


export const InputNumber = class InputText extends Component {
  render() {
    let classes = "form-group";
    if (this.props.className) { classes += ` ${this.props.className}` }
    const instructions = this.props.instructions ? ( <small className="form-text text-muted">{this.props.instructions}</small> ) : null;
    const error = this.props.error ? ( <small className="form-text text-danger">{this.props.error}</small> ) : null;
    return (
      <div className={classes}>
        <label className="text-capitalize" htmlFor={this.props.attribute}>{this.props.label}</label>
        <input 
          type="number"
          className="form-control"
          name={this.props.attribute} 
          placeholder={this.props.placeholder}
          value={this.props.value}
          onChange={this.props.onChange}
          step={this.props.step ? this.props.step : 1} 
          min={this.props.min ? this.props.min : -99999999999999}
          max={this.props.max ? this.props.max : 99999999999999}           
        />
        {instructions}
        {error}
      </div>
    );      
  }
}


export const InputColor = class InputColor extends Component {
  render() {
    let classes = "form-group";
    if (this.props.className) { classes += ` ${this.props.className}` }
    const instructions = this.props.instructions ? ( <small className="form-text text-muted">{this.props.instructions}</small> ) : null;
    const error = this.props.error ? ( <small className="form-text text-danger">{this.props.error}</small> ) : null;
    return (
      <div className={classes}>
        <label htmlFor={this.props.attribute}>{this.props.label}</label>
        <input 
          type="color" 
          name={this.props.attribute}
          placeholder={this.props.placeholder}
          className="form-control" 
          value={this.props.value}
          onChange={this.props.onChange} 
        />
        {instructions}
        {error}
      </div>
    );
  }
}

export const SubmitGroup = class SubmitGroup extends Component {
  render() {
    let classes = "form-group text-center";
    if (this.props.className) { classes += ` ${this.props.className}` }
    return (
      <div className={classes}>
        <div className="btn-group">
          <button className="btn btn-secondary" onClick={this.props.onCancel || function() { alert('Cancel Edit Button Clicked!')}}>
            <i className="mdi mdi-cancel mr-2"/>Cancel
          </button>
          <button type="submit" className="btn btn-success">
            <i className="mdi mdi-content-save mr-2"/>Save
          </button>
        </div>
      </div>
    );
  }
}
