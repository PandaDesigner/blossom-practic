import { gql } from '@apollo/client';

export const GET_ALL_CHARACTERS = gql`
            query GetAllCharacters($page: Int) {
                characters(page: $page) {
                    info {
                        count
                        pages
                        next
                        prev
                    }
                    results {
                        id
                        name
                        status
                        type
                        species
                        image
                        gender
                    }
                }
            }
        `;

export const GET_CHARACTERS_BY_NAME = gql`
        query GetCharactersByName($name: String!, $page: Int) {
            characters(page: $page, filter: { name: $name }) {
                info {
                    count
                    pages
                    next
                    prev
                }
                results {
                    id
                    name
                    status
                    type
                    species
                    image
                    gender
                }
            }
        }
    `;

export const GET_CHARACTER_BY_ID = gql`
            query GetCharacterById($id: ID!) {
                character(id: $id) {
                    id
                    name
                    status
                    type
                    species
                    image
                    gender
                }
            }
        `;