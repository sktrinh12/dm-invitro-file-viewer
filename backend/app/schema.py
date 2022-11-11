from pydantic import BaseModel

class MdataSchema(BaseModel):
    compound_id: str
    ds: str


class FileSchema(BaseModel):
    doc_id: str
    file_name: str
    id: str


