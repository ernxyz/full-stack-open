import { gql } from "@apollo/client"

export const LOGIN = gql`
  mutation($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`

const PERSON_DETAILS = gql`
fragment PersonDetails on Person {
  id
  name
  phone
  address {
    city
    street
  }
}
`

export const ALL_PERSONS = gql`
query {
  allPersons {
    name
    phone
    id
  }
}
`

export const FIND_PERSON = gql`
query findPersonByName($nameToSearch: String!) {
  findPerson(name: $nameToSearch) {
    ...PersonDetails
  }
}
${PERSON_DETAILS}
`

export const CREATE_PERSON = gql`
mutation createPerson($name: String!, $phone: String, $street: String!, $city: String!){
  addPerson(
    name: $name
    phone: $phone,
    street: $street,
    city: $city
  ) {
    id
    name
    phone
    address {
      city
      street
    }  
  }
}
`

export const UPDATE_CONTACT = gql`
mutation editNumber($name: String!, $phone: String!) {
  editNumber(name: $name, phone: $phone) {
    id  
    name
    phone
    address {
      city
      street
    }
  }
}
`

export const PERSON_ADDED = gql`
subscription {
  personAdded {
    ...PersonDetails
  }
}
${PERSON_DETAILS}
`