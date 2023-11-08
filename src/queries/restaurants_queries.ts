import { gql } from "@apollo/client";

export const GET_RESTAURANTS = gql`
query restaurants{
  restaurants{
    idrestaurant
    name
    url
    liked
    meals{
      foodies{
        category
        names
      }
      typemeal
    }
  }
}
`


export const GET_RESTAURANT = gql`
query restaurant($url: String!){
  restaurant(url: $url){
    idrestaurant
    name
    url
    liked
    meals{
      foodies{
        category
        names
      }
      typemeal
    }
  }
}
`

export const GET_FOODS = gql`
  query Food {
    food {
        names
        category
        restaurants{
            name
        }
    }
}
`;


export const LIKE_MUTATION = gql`
  mutation Like($idrestaurant: Int!) {
    like(idrestaurant: $idrestaurant) {
      idrestaurant
      liked 
    }
  }
`;

export const DISLIKE_MUTATION = gql`
  mutation Dislike($idrestaurant: Int!) {
    dislike(idrestaurant: $idrestaurant) {
      idrestaurant
      liked
    }
  }
`;

export const SEARCH = gql`
query Search($query: String){
    search(query: $query) {
    idrestaurant
    name
    url
    liked
    meals{
      foodies{
        category
        names
      }
      typemeal
    }
    }
}
`
