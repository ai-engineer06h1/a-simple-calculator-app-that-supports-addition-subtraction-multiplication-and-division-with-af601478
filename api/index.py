import os
from fastapi import FastAPI, HTTPException, Depends, Body
from pydantic import BaseModel, Field
from typing import List, Optional
import asyncpg
from datetime import datetime

app = FastAPI()

DATABASE_URL = os.environ['DATABASE_URL']

class Calculation(BaseModel):
    id: Optional[int] = Field(default=None)
    calculation: str
    result: float
    created_at: str

async def get_db_connection():
    connection = await asyncpg.connect(DATABASE_URL)
    return connection

@app.post("/calculations/", response_model=Calculation)
async def create_calculation(calculation: Calculation, db: asyncpg.Connection = Depends(get_db_connection)):
    query = "INSERT INTO calculations(calculation, result, created_at) VALUES($1, $2, $3) RETURNING *"
    values = (calculation.calculation, calculation.result, calculation.created_at)
    record_id = await db.fetchrow(query, *values)
    if not record_id:
        raise HTTPException(status_code=400, detail="Calculation not created")
    return Calculation(**record_id)

@app.get("/calculations/", response_model=List[Calculation])
async def get_calculations(skip: int = 0, limit: int = 10, db: asyncpg.Connection = Depends(get_db_connection)):
    query = "SELECT * FROM calculations ORDER BY created_at DESC OFFSET $1 LIMIT $2"
    records = await db.fetch(query, skip, limit)
    return [Calculation(**record) for record in records]