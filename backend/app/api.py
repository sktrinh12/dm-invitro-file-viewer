from fastapi import FastAPI, Response, Request, HTTPException, Depends, APIRouter
from fastapi.middleware.cors import CORSMiddleware
from app import config
from app.schema import MdataSchema, FileSchema
from app.oracle import OracleConnection
from app.functions import oracle_query
from app.sql import sql_text_dct


app = FastAPI(title="IN-VITRO FILES VIEWER", version="1.0")

origins = [
    "http://localhost:3000",
    "localhost:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

pid_map = {
    'combo': '481',
    'cell': '441, 481, 201'
}


@app.get("/")
def read_root():
    return {"Hello": "World"}


main_router = APIRouter(prefix="/v1")


@main_router.get("/fetch-mdata")
async def fetch_data(
    mdata: MdataSchema = Depends(),
    settings: config.Settings = Depends(config.get_settings),
) -> Response:
    if mdata.ds.lower() == "combo":
        ds_string = f"= {pid_map[mdata.ds.lower()]}"
        ds_join_string = sql_text_dct["fetch_mdata_combo_ds"]
    else:
        ds_string = f"IN ({pid_map[mdata.ds.lower()]})"
        ds_join_string = sql_text_dct["fetch_mdata_cell_ds"]
    sql_str = sql_text_dct["fetch_mdata_base"] + ' ' + \
        ds_join_string + ' ' + \
        sql_text_dct["fetch_mdata_where"]
    print(sql_str)
    response = oracle_query(
        sql_str.format(ds_string, mdata.compound_id),
        settings=settings,
        blob=False,
    )
    return response


@main_router.get("/fetch-file")
async def fetch_file(
    fdata: FileSchema = Depends(),
    settings: config.Settings = Depends(config.get_settings),
) -> Response:
    response = oracle_query(
        sql_text_dct["fetch_file"].format(fdata.doc_id, fdata.file_name, fdata.id),
        settings=settings,
        blob=True,
        file_name=fdata.file_name,
    )
    return response

app.include_router(main_router)
