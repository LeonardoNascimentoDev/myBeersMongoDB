import React, { useEffect, useState } from 'react';

import { Page } from '../../components/Page/styled';
import { Container } from '../../components/Container/styled';
import { Button } from '../../components/Button/styled';
import { useHistory } from 'react-router-dom';
import Banner from '../../components/Banner';

import { 
  Header, 
  Body, 
  BodyHeader, 
  HeaderColLeft,
  HeaderColCenter,
  HeaderColRight, 
  Brand, 
  Search,
  Profile,
  ProfileAvatar,
  ProfileUser,
  BodyHeaderColLefth,
  BodyHeaderColRight,
  BodyHeaderTitle,
  ContainerTransacoesList,
  ContainerTransacoesListWrapper,
  ContentTransacoesListWrapper,
  ContainerTransacoesListWrapperFoto,
  ContainerTransacoesListWrapperHeader,
  ContainerTransacoesListWrapperBody,
  ContainerTransacoesListWrapperTitle,
  ContainerTransacoesListWrapperSobre,
  Message,
  Paginate,
  PaginateItem,
  ResultSearch,
  ResultSearchTitle,
  ResultSearchSobre
} from './styled';

import ModalCrud from './components/ModalCrud';
import { GET } from '../../services';

const BeersPage = () => {

  const username = JSON.parse(sessionStorage.getItem('username'))

  const history = useHistory();
  function getToken() {
    const tokenString = sessionStorage.getItem('token');
    return tokenString;
  }

  const token = getToken();

  if(!token) {
    history.push('/login')          
  }

  const [searchValue, setSearchValue] = useState(null);
  const [resultSearch, setResultSearch] = useState(null);
  const handleSearch = async () => {
    try {
      console.log('handleSearch target...');
      if (searchValue) {
        const response = await GET(`api/v1/transaction-search/${searchValue}`);
        const responseResult = await response.json();
        console.log('handleSearch responseResult:', responseResult);
        setResultSearch(responseResult);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (searchValue) handleSearch();
  }, [searchValue])

  const [paginate, setPaginate] = useState({
    total: 325,
    pages: 9, 
    currentPage: 0
  });

  const [TransacoesList, setTransacoesList] = useState([]);
  const [transacoesResponse, setTransacoesResponse] = useState([]);

  const perPage = paginate?.currentPage > 8 ? 5 : 40;

  const handleGetBeers = async () => {
    try {
      console.log('paginate', paginate)
      const response = await GET(`api/v1/beers?page=${paginate.currentPage}&per_page=${perPage}`);
      console.log('handleGetBeers response:', response);
      const responseResolved = await response.json();
      console.log('handleGetBeers responseResolved:', responseResolved);
      setTransacoesResponse(responseResolved);

      if (responseResolved?.length) {
        const result = responseResolved; 
        //* eu comentei pq aqui ele pega as paginas e add na paginate
        //* funciona quando traz todas as paginas, e não precisa mais buscar
        //* e vc trabalha a paginaçao com elas, nesse caso ele traz apenas 25 por vex

        // Resolve a paginação
        //const currentPage = paginate;
        //console.log('resolve length:',responseResolved.length);
        //const numPages = Math.ceil(responseResolved.length / perPage);
        //const numPages = responseResolved.length;
        //console.log('handleGetBeers numPages:', numPages);
        //const pages = []
        //console.log('handleGetBeers pages:', pages);

        /*for (let index = 1; index < numPages; index++) { 
          pages.push({text: index});
        }*/

        //const init = 0; // currentPage * perPage;
        //const end = init + perPage
        //console.log('handleGetBeers init:', init);
        //console.log('handleGetBeers end:', end);
        //const result = responseResolved.slice(init, end);
        //console.log('handleGetBeers result:', result);
        //console.log('result', result)
        /*
        setPaginate({
          pages,
          currentPage
        });
        */
        // Set resultado inicial
        setTransacoesList(result);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => { 
    //* inicia a paginacao
    setPaginate({
      ...paginate,
      currentPage: 1
    })
  }, []);

  useEffect(() => {
    //* toda vez que alterar a pagina ele busca novamente
    if (paginate.currentPage > 0) {
      handleGetBeers();
    } 
  }, [paginate]);

  const [viewModalCrud, setViewModalCrud] = useState(false);
  const [typeModalCrud, setTypeModalCrud] = useState(null);
  const [dataTransaction, setDataTransaction] = useState(null);

  const handleOpenModalCrud = (type, empresa) => { 
    setViewModalCrud(true);
    setTypeModalCrud(type);
    if (empresa) setDataTransaction(empresa);
  }

  const [message, setMessage] = useState(null);
  const handleCloseModalCrud = (refresh, messageCrud) => {
    setViewModalCrud(false);
    setTypeModalCrud(null);

    if (messageCrud) {
      setMessage(messageCrud);
      setTimeout(() => setMessage(null), 3000);
      window.scrollTo(0, 0);
    }

    if (refresh) handleGetBeers();
  }

  const handlePaginate = (page) => {
    console.log('handle paginate', page)
    try {
      //* nesse bloco ele realizava a paginacao dos dados salvos
      //* para esse caso ele precisa buscar novamente pois nao temos todas os dados salvos
      /*console.log('handlePaginate paginate:', paginate);
      const init = page * perPage;
      const end = init + perPage
      console.log('handleGetBeers init:', init);
      console.log('handleGetBeers end:', end);
      const result = transacoesResponse.slice(init, end);
      console.log('handleGetBeers result:', result);*/
      //* apenas altera a pagina
      setPaginate({
        ...paginate,
        currentPage: page
      })

      // Set resultado inicial
      //setTransacoesList(result);
    } catch (error) {
      console.log(error);
    }
  }

  const handleExitSession = () => {
    sessionStorage.clear();
    history.push('/login')          
  }

  const renderPaginate = () => {
    let listPages = [];
    for (let index = 1; index <= paginate.pages; index++) { 
      listPages.push( 
        <PaginateItem 
          key={index} 
          className={paginate.currentPage === index ? 'selected' : ''} 
          onClick={() => handlePaginate(index)}
        > {index}
        </PaginateItem> 
      )
    }
    return listPages
  }

  const renderImage = (image) => {
    if (image) {
      return (<ContainerTransacoesListWrapperFoto src={image} />)
    }
    return (<ContainerTransacoesListWrapperFoto className="noPhoto" src="http://localhost:3000/no-photo.jpg" alt="Sem foto"  />)
    
  }

  /**
   * Render
  */

  return (
    <Page>
      <Container>
        <Header>
          <HeaderColLeft>
            <Brand src="http://localhost:3000/logo192.png" alt="Brand" />
          </HeaderColLeft> 
          <HeaderColCenter>
            <Search placeholder="Pesquisar..." onChange={(e) => setSearchValue(e?.target?.value)}/>
            {resultSearch && (
              <ResultSearch onClick={() => handleOpenModalCrud('read', resultSearch)}>
                <ResultSearchTitle>{resultSearch?.name}</ResultSearchTitle>
                <ResultSearchSobre>{resultSearch?.description}</ResultSearchSobre>
              </ResultSearch>
            )}
          </HeaderColCenter>
          <HeaderColRight>
             <Profile>
              <ProfileAvatar src="http://localhost:3000/logo192.png" alt="Profile user avatar" />
              <ProfileUser>{username }</ProfileUser>
             </Profile>
             <BodyHeaderColRight>
              <Button onClick={() => handleExitSession()}>Sair</Button>
            </BodyHeaderColRight>
          </HeaderColRight>
        </Header> 
        <Body> 
          <Banner handleClick={handleOpenModalCrud}/>
          <BodyHeader>
            <BodyHeaderColLefth>
              <BodyHeaderTitle>MyTapp</BodyHeaderTitle>
            </BodyHeaderColLefth>
          </BodyHeader>

          {message && (<Message>{message}</Message>)}
          
          <ContainerTransacoesList>
            {TransacoesList.map((empresa, i) => (
              <ContainerTransacoesListWrapper key={String(i)} onClick={() => handleOpenModalCrud('read', empresa)}>
                <ContentTransacoesListWrapper>
                  <ContainerTransacoesListWrapperHeader>
                    {renderImage(empresa.image_url)}
                  </ContainerTransacoesListWrapperHeader>
                  <ContainerTransacoesListWrapperBody>
                    <ContainerTransacoesListWrapperTitle>{empresa.name}</ContainerTransacoesListWrapperTitle>
                    <ContainerTransacoesListWrapperSobre>{empresa.description}</ContainerTransacoesListWrapperSobre>
                  </ContainerTransacoesListWrapperBody>
                  </ContentTransacoesListWrapper>
              </ContainerTransacoesListWrapper>
            ))}
          </ContainerTransacoesList>
          {paginate?.pages > 1 && (
            <Paginate className='paginate'> 
              {renderPaginate()}
            </Paginate>
          )}
        </Body>
      </Container> 
      {viewModalCrud && (
        <ModalCrud 
          type={typeModalCrud}
          handleType={setTypeModalCrud}
          handleClose={handleCloseModalCrud}
          dataTransaction={dataTransaction}
          />
      )}
    </Page>
  )
}

export default BeersPage;
 
/*
 {!!paginate?.pages?.length && (
    <Paginate className='paginate'>
      {paginate.pages.map((item, i) => (
        <PaginateItem key={i} className={paginate.currentPage === item.text ? 'selected' : ''} onClick={() => handlePaginate(item.text)}>{item.text}</PaginateItem>
      ))}
    </Paginate>
  )}
*/

/*
<Page>
      <Container>
        <Header>
          <HeaderColLeft>
            <Brand src="http://localhost:3000/logo192.png" alt="Brand" />
          </HeaderColLeft>
          <HeaderColCenter>
            <Search placeholder="Pesquisar..." onChange={(e) => setSearchValue(e?.target?.value)}/>
            {resultSearch && (
              <ResultSearch onClick={() => handleOpenModalCrud('read', resultSearch)}>
                <ResultSearchTitle>{resultSearch?.name}</ResultSearchTitle>
                <ResultSearchSobre>{resultSearch?.description}</ResultSearchSobre>
              </ResultSearch>
            )}
          </HeaderColCenter>
          <HeaderColRight>
             <Profile>
              <ProfileAvatar src="http://localhost:3000/logo192.png" alt="Profile user avatar" />
              <ProfileUser>{username }</ProfileUser>
             </Profile>
             <BodyHeaderColRight>
              <Button onClick={() => handleExitSession()}>Sair</Button>
            </BodyHeaderColRight>
          </HeaderColRight>
        </Header>
        <Body>
          <Banner />
          <BodyHeader>
            <BodyHeaderColLefth>
              <BodyHeaderTitle>MyTapp</BodyHeaderTitle>
            </BodyHeaderColLefth>
          </BodyHeader>

          {message && (<Message>{message}</Message>)}
          
          <ContainerTransacoesList>
            {TransacoesList.map((empresa, i) => (
              <ContainerTransacoesListWrapper key={String(i)} onClick={() => handleOpenModalCrud('read', empresa)}>
                <ContentTransacoesListWrapper>
                  <ContainerTransacoesListWrapperHeader>
                    <ContainerTransacoesListWrapperFoto src={empresa.image_url} />
                  </ContainerTransacoesListWrapperHeader>
                  <ContainerTransacoesListWrapperBody>
                    <ContainerTransacoesListWrapperTitle>{empresa.name}</ContainerTransacoesListWrapperTitle>
                    <ContainerTransacoesListWrapperSobre>{empresa.description}</ContainerTransacoesListWrapperSobre>
                  </ContainerTransacoesListWrapperBody>
                  </ContentTransacoesListWrapper>
              </ContainerTransacoesListWrapper>
            ))}
          </ContainerTransacoesList>
        </Body>

        {paginate?.pages > 1 && (
          <Paginate className='paginate'> 
            {renderPaginate()}
          </Paginate>
        )}
      </Container>

      {viewModalCrud && (
        <ModalCrud 
          type={typeModalCrud}
          handleType={setTypeModalCrud}
          handleClose={handleCloseModalCrud}
          dataTransaction={dataTransaction}
          />
      )}
    </Page>
    */