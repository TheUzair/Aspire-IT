"""Add user model for authentication

Revision ID: 8504e4d12407
Revises: 4cad6cdbba65
Create Date: 2024-09-08 13:40:53.628977

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '8504e4d12407'
down_revision = '4cad6cdbba65'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('user',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('username', sa.String(length=50), nullable=False),
    sa.Column('password', sa.String(length=255), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('username')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('user')
    # ### end Alembic commands ###
