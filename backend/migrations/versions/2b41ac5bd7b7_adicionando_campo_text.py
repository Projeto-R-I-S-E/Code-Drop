"""adicionando campo text

Revision ID: 2b41ac5bd7b7
Revises: 94285c536840
Create Date: 2025-03-06 21:51:35.067563

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '2b41ac5bd7b7'
down_revision = '94285c536840'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('links', schema=None) as batch_op:
        batch_op.add_column(sa.Column('text', sa.Text(), nullable=True))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('links', schema=None) as batch_op:
        batch_op.drop_column('text')

    # ### end Alembic commands ###
