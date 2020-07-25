import chunk from 'lodash/chunk.js';

export default function main(list, options){

  const defaults = {
    perPage: 10,
  };

  const {perPage} = Object.assign({}, defaults, options);

  let data = chunk(list, perPage);

  data = data
  .map((data,index)=>({meta:{pageNumber:index+1, isFirst:null, isLast:null, previousPage:null, nextPage:null},data}))
  .map((entry,index)=>{


    entry.meta.isFirst = entry.meta.pageNumber==1?true:false;
    entry.meta.isLast =  entry.meta.pageNumber==data.length?true:false;

    entry.meta.lastPage = data.length;
    entry.meta.previousPage = entry.meta.pageNumber - 1;
    entry.meta.nextPage = entry.meta.pageNumber + 1;

    if (entry.meta.previousPage == 0) entry.meta.previousPage = entry.meta.lastPage;
    if (entry.meta.nextPage > entry.meta.lastPage) entry.meta.nextPage = 1;

    // TODO: find a nice way to create some page numbers
    // entry.meta.previousPages = [];
    // entry.meta.nextPages = [];

    // TODO: create a chain of clickable pages
    // TODO: honor timestamps and introduce concept of OLDER/NEWER pagination
    

    return entry;
  })

  const meta = {
    perPage,
    totalItems: list.length,
    totalPages: data.length,
  }

  const response = {meta, data};


  return response;

}
